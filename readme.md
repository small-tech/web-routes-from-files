# Web routes from files

Recursively traverses a given directory structure and uses convention to create a list of web route objects that map url paths to JavaScript callback files.

## Install

```shell
npm i @ind.ie/web-routes-from-files
```

## Use

```js
const getRoutes = require ('recursive-directory-structure-to-web-route-map')

const routes = getRoutes('.')

routes.forEach(route => {
  console.log(`${route.path}: ${route.callback}`)
})
```

## Details

Given the following directory structure:

```sh
.routes
   ├─── index.js
   ├─── my-folder
   │       ├── index.js
   │       └── other.js
   └─── neat.js
```

And the following invocation:

```js
const getRoutes = require ('recursive-directory-structure-to-web-route-map')
const routes = getRoutes('.routes')
```

You will get the following data structure:

```js
[
  { path: '/', file: '.routes/index.js' },
  { path: '/my-folder', file: '.routes/my-folder/index.js' },
  { path: '/my-folder/other', file: '.routes/my-folder/other.js' },
  { path: '/neat', file: '.routes/neat.js' }
]
```

Which, for example, you could pass to an [Express](https://expressjs.com/) app:


```js
const express = require('express')
const getRoutes = require ('recursive-directory-structure-to-web-route-map')

const app = express()
const routes = getRoutes('.routes')

routes.forEach(route => {
  app.get(route.path, require(route.callback))
})

app.listen(8080, () => console.log('Server running on http://localhost:8080'))
```

Your routes should export standard middleware-style functions. e.g.,

```js
function route (request, response, next) {
  response.end('Hello, world!')
}
module.exports = route
```
