import boto3
import logging
import datetime
import os

from ..utils.common_db_utils import chunks, BATCH_WRITE_CHUNK_SIZE
from ..utils.idea_utils import sanitize_idea_content, prepare_idea_tags_for_put_request, \
    prepare_idea_tags_for_delete_request

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)


def endpoint(event, lambda_context):
    ctx = event.get('ctx')
    arguments = ctx.get('arguments')
    title = arguments.get('title')
    content = sanitize_idea_content(arguments.get('content', None))
    idea_id = arguments.get('ideaId', None)
    idea_owner_id = arguments.get('ideaOwnerId', None)
    tags = arguments.get('tags', list())
    editor_id = ctx.get('identity').get('username')
    if editor_id != idea_owner_id:
        return {'result': {'ok': False, 'error': 'You do not have permission to edit this idea'}}
    if len(tags) > 100:
        return {'result': {'ok': False, 'error': 'Too much tags'}}
    client = boto3.client('dynamodb', region_name='us-east-1')
    client.update_item(
        TableName=os.environ.get('IDEAS_TABLE_NAME'),
        Key={
            'ideaId': {"S": idea_id},
            'userId': {"S": idea_owner_id}
        },
        UpdateExpression='SET title = :title, content = :content, updatedDate = :updatedDate',
        ExpressionAttributeValues={
            ":title": {"S": title},
            ":content": {"S": content} if content else {"NULL": True},
            ":updatedDate": {"S": datetime.datetime.now().isoformat()},
        }
    )
    current_idea_tags = list(map(lambda t: t['tag']['S'], client.query(
        TableName=os.environ.get('TAGS_TABLE_NAME'),
        IndexName='ideaTags',
        ProjectionExpression='tag',
        KeyConditionExpression="ideaId = :ideaId",
        ExpressionAttributeValues={
            ":ideaId": {"S": idea_id}
        }
    )['Items']))
    if len(current_idea_tags):
        prepared_tags = prepare_idea_tags_for_delete_request(current_idea_tags, idea_id)
        for tags_chunk in chunks(prepared_tags, BATCH_WRITE_CHUNK_SIZE):
            client.batch_write_item(
                RequestItems={
                    os.environ.get('TAGS_TABLE_NAME'): tags_chunk
                }
            )
    if len(tags):
        prepared_tags = prepare_idea_tags_for_put_request(tags, idea_owner_id, idea_id)
        for tags_chunk in chunks(prepared_tags, BATCH_WRITE_CHUNK_SIZE):
            client.batch_write_item(
                RequestItems={
                    os.environ.get('TAGS_TABLE_NAME'): tags_chunk
                }
            )

    return {'result': {'ok': True}, 'idea': {'ideaId': idea_id}}
