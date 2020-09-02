const fs = require('fs')
const path = require('path')

function routes (directory, directoryRoot = null) {
  let _routes = []

  // These shenanigans are for Windows path silliness support.
  let directoryForRegExp = directory
  if (process.platform === 'win32') {
    directoryForRegExp = directoryForRegExp.replace(/\\/g, '\\\\')
  }

  if (directoryRoot === null) directoryRoot = new RegExp(`^.*${directoryForRegExp.replace('.', '\\.')}`)

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
      _routes = _routes.concat(routes(path.join(directory, file.name), directoryRoot))
    } else if (file.isFile() && file.name.endsWith('.js')) {
      //
      // File.
      //

      let routeCallbackFilePath = path.resolve(path.join(directory, file.name))
      let routeUrlPath = path.join(directory.replace(directoryRoot, ''), file.name)

      // Note: the regexp is written so that it will strip the leading slash properly
      // ===== on both Linux-style and Windows environments.
      routeUrlPath = routeUrlPath.replace(/\/?\\?index(.*?)\.js$/, '$1')
      routeUrlPath = routeUrlPath.replace('.js', '')
      routeUrlPath = routeUrlPath.replace(/\/$/, '')

      // Handle parameter formatting:
      //
      // _  : parameter delimeter (/:)
      // __ : static path fragment delimeter (/)
      //
      // e.g., /person/index_personId__book__bookId becomes:
      //       /person/:personId/book/:bookId
      routeUrlPath = routeUrlPath.replace(/__/g, '/')
      routeUrlPath = routeUrlPath.replace(/_/g, '/:')

      // On Windows, the file path slashes are backwards so we have to reverse them.
      if (process.platform === 'win32') {
        // Since the code replacing the forward slash at the end will not have caught a backslash at the end
        // on Windows, do that now.
        routeUrlPath = routeUrlPath.replace(/\\$/, '')
        // Replace all backslashes with forwardslashes.
        routeUrlPath = routeUrlPath.replace(/\\/g, '/')
      }
      if (!routeUrlPath.startsWith('/')) routeUrlPath = `/${routeUrlPath}`
      _routes.push({path: routeUrlPath, callback: routeCallbackFilePath})
    }
  })

  return _routes
}

module.exports = routes
