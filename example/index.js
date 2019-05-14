const express = require('express')
const getRoutes = require ('..')

const app = express()
const routes = getRoutes('.routes')

routes.forEach(route => {
  app.get(route.path, require(route.callback))
})

app.listen(8080, () => console.log('Server running on http://localhost:8080'))
