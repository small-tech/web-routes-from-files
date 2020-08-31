function route (request, response, next) {
  response.end(`rabbit/${rabbitName}`)
}
module.exports = route
