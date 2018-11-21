module.exports = function reload ({ File, Events }, uri) {
  var location = require('fs').realpathSync(require('path').resolve(File.cwd, uri))
  if (Object.keys(require.cache).indexOf(location) == -1) return
  require('clear-module')(location)
  Events.emit('RemovedFromRequireCache', location) }
