module.exports = function check (cwd, uri) {
  var fullPath = require('path').resolve(cwd, uri)
    , events = require('./constants').events
  return new Promise(next=>
    require('fs').stat(fullPath, (error, fs)=>next(error
      ? [ events.FileError,   uri, error ]
      : [ events.FileChecked, uri, { fs, fullPath } ]))) }

