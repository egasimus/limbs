module.exports = function load (cwd, uri) {
  const { FileError, FileLoaded } = require('../../File').events
  return new Promise(next=>
    require('fs').readFile(require('path').resolve(cwd, uri), 'utf8', (error, data)=>
      next(error
        ? [ FileError,  uri, error ]
        : [ FileLoaded, uri, data  ]))) }

