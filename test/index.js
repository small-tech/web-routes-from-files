const path      = require('path')
const getRoutes = require ('..')
const test = require('tape')

test('routes', t => {
  t.plan(12)

  const exampleRoutesPath = path.join('example', '.routes')
  const actualRoutes = getRoutes(exampleRoutesPath)

  const expectedRoutes = [
    {
      path: '/',
      callback: 'index.js'
    },
    {
      path: '/my-folder',
      callback: path.join('my-folder', 'index.js')
    },
    {
      path: '/my-folder/other',
      callback: path.join('my-folder', 'other.js')
    },
    {
      path: '/neat',
      callback: 'neat.js'
    },
    {
      path: '/person/:personId/book/:bookId',
      callback: path.join('person', 'index_personId__book_bookId.js')
    },
    {
      path: '/rabbit/:rabbitName',
      callback: 'rabbit_rabbitName.js'
    }
  ]

  expectedRoutes.forEach((expectedRoute, index) => {
    const actualRoute = actualRoutes[index]
    t.strictEquals(actualRoute.path, expectedRoute.path, `Route #${index}: route is correct.`)
    t.strictEquals(actualRoute.callback, path.join(path.resolve(exampleRoutesPath), expectedRoute.callback), `Route #${index}: callback path is correct.`)
  })

  t.end()
})
