module.exports = function reload (cwd, event, emit) {
  var location = require('fs').realpathSync(require('path').resolve(cwd, event[1]))
  if (Object.keys(require.cache).indexOf(location) == -1) return
  require('clear-module')(location)
  emit('RemovedFromRequireCache', location) }
