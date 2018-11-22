module.exports = function reload ({ File, Events }, location) {
  if (Object.keys(require.cache).indexOf(location) == -1) return
  require('clear-module')(location)
  Events.emit('WillReload', location) }
