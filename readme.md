# Web routes from files

Recursively traverses a given directory structure and uses convention to create a list of web route objects that map Express-style URL paths to JavaScript callback files.

## Installation

```shell
npm i @small-tech/web-routes-from-files
```

## Usage

```js
const getRoutes = require ('web-routes-from-files')

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
   ├─── person
   │       └── index_personId__book_bookId.js
   ├─── rabbit_rabbitName.js
   └─── neat.js
```

And the following invocation:

```js
const getRoutes = require ('web-routes-from-files')
const routes = getRoutes('.routes')
```

You will get the following data structure:

```js
[
  { path: '/', callback: '.routes/index.js' },
  { path: '/my-folder', callback: '.routes/my-folder/index.js' },
  { path: '/my-folder/other', callback: '.routes/my-folder/other.js' },
  { path: '/person/:personId/book/:bookId', callback: '.routes/person/index_personId__book_bookId.js' },
  { path: '/rabbit/:rabbitName', callback: '.routes/rabbit_rabbitName.js' },
  { path: '/neat', callback: '.routes/neat.js' }
]
```

Which, for example, you could pass to an [Express](https://expressjs.com/) app (as [Site.js](https://sitejs.org)) does:


```js
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
```

Your routes should export standard middleware-style functions. e.g.,

```js
function route (request, response, next) {
  response.end('Hello, world!')
}
module.exports = route
```

Routes that take parameters (introduced in version 3.0.0) can access them from the `request.params` object. e.g., in the `.routes/person/index_personId__book_bookId.js` callback file:

```js
function route (request, response, next) {
  response.end(`person/${request.params.personId}/book/${request.params.bookId}`)
}
module.exports = route
```

This example is included in the source code. Run it with:

```sh
node example
```

__Note:__ This module will ignore `node_modules` folders and any folder within the root folder being traversed that begins with a dot (i.e., any hidden folder).

## Like this? Fund us!

[Small Technology Foundation](https://small-tech.org) is a tiny, independent not-for-profit.

We exist in part thanks to patronage by people like you. If you share [our vision](https://small-tech.org/about/#small-technology) and want to support our work, please [become a patron or donate to us](https://small-tech.org/fund-us) today and help us continue to exist.

## Audience

This is [small technology](https://small-tech.org/about/#small-technology).

If you’re evaluating this for a “startup” or an enterprise, let us save you some time: this is not the right tool for you. This tool is for individual developers to build personal web sites and apps for themselves and for others in a non-colonial manner that respects the human rights of the people who use them.

## Copyright

&copy; 2020 [Aral Balkan](https://ar.al), [Small Technology Foundation](https://small-tech.org).

## License

[AGPL version 3.0 or later.](https://www.gnu.org/licenses/agpl-3.0.en.html)
