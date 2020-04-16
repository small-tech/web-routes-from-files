const path      = require('path')
const express   = require('express')
const getRoutes = require ('..')

const app = express()
const routes = getRoutes(path.join(__dirname, '.routes'))

routes.forEach(route => {
  console.log(` • Adding route: ${route.path}`)
  app.get(route.path, require(route.callback))
})

app.listen(8080, () => console.log('\nServer running on http://localhost:8080'))
