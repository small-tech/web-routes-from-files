const path      = require('path')
const express   = require('express')
const getRoutes = require ('..')

const app = express()
const routes = getRoutes(path.join(__dirname, '.routes'))

routes.forEach(route => {
  console.log(` • Adding route: ${route.path}`)

  // Note that while .mjs and .cjs files are supported,
  // this module cannot defy the laws of ECMAScript. So the
  // same rules defining mixing of CommonJS and ESM apply here too.
  if (!route.callback.endsWith('.mjs')) {
    app.get(route.path, require(route.callback))
  }
})

app.listen(8080, () => console.log('\nServer running on http://localhost:8080'))
