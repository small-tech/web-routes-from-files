const fs = require('fs')
const path = require('path')

function routes (directory) {
  let _routes = []

  const files = fs.readdirSync(directory, {withFileTypes: true})

  files.forEach(file => {
    if (file.isDirectory()) {
      //
      // Directory.
      //
      if (file.name === 'node_modules' || file.name.startsWith('.')) {
        // Skip.
        return
      }
      // Recurse.
      _routes = _routes.concat(routes(path.join(directory, file.name)))
    } else if (file.isFile() && file.name.endsWith('.js')) {
      //
      // File.
      //
      let routeCallbackFilePath = path.resolve(path.join(directory, file.name))
      let routeUrlPath = path.join(directory.replace(/.*\.routes/, ''), file.name.replace('.js', ''))
      routeUrlPath = routeUrlPath.replace(/index$/, '')
      routeUrlPath = routeUrlPath.replace(/\/$/, '')
      if (!routeUrlPath.startsWith('/')) routeUrlPath = `/${routeUrlPath}`
      _routes.push({path: routeUrlPath, callback: routeCallbackFilePath})
    }
  })

  return _routes
}

module.exports = routes
