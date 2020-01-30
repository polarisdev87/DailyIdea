export default `
query getMyIdea($ideaId: String!) {
  getMyIdea(ideaId: $ideaId) {
    ideaId
    authorName
    content
    title
    createdDate
    ideaDate
    likesCount
    commentsCount
    visibility
  }
}`
