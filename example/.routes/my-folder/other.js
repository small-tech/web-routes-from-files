function route (request, response, next) {
  response.end('my-folder/other')
}
module.exports = route
