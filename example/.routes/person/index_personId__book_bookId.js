function route (request, response, next) {
  response.end(`person/${request.params.personId}/book/${request.params.bookId}`)
}
module.exports = route
