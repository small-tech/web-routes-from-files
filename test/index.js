const path      = require('path')
const getRoutes = require ('..')
const test = require('tape')

test('routes', t => {
  t.plan(12)

  const actualRoutes = getRoutes(path.join('example', '.routes'))

  const expectedRoutes = [
    {
      path: '/',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/index.js'
    },
    {
      path: '/my-folder',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/my-folder/index.js'
    },
    {
      path: '/my-folder/other',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/my-folder/other.js'
    },
    {
      path: '/neat',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/neat.js'
    },
    {
      path: '/person/:personId/book/:bookId',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/person/index_personId__book_bookId.js'
    },
    {
      path: '/rabbit/:rabbitName',
      callback: '/home/aral/small-tech/site.js/lib/web-routes-from-files/example/.routes/rabbit_rabbitName.js'
    }
  ]

  expectedRoutes.forEach((expectedRoute, index) => {
    const actualRoute = actualRoutes[index]
    t.strictEquals(actualRoute.path, expectedRoute.path, `Route #${index}: route is correct.`)
    t.strictEquals(actualRoute.callback, expectedRoute.callback, `Route #${index}: callback path is correct.`)
  })

  t.end()
})
