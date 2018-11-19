module.exports = function check (cwd, uri) {
  const fullPath = require('path').resolve(cwd, uri)
  const { FileError, FileChecked } = require('../../File').events
  return new Promise(next=>
    require('fs').stat(fullPath, (error, fs)=>next(error
      ? [ FileError,   uri, error ]
      : [ FileChecked, uri, { fs, fullPath } ]))) }

