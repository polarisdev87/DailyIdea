export default `
query getIsIdeaLikedByMe($ideaId: String!) {
  getIsIdeaLikedByMe(ideaId: $ideaId) {
    result {
    ok
    }
    isLiked
  }
}`
