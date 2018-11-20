var File   = require('limbs-file')
  , events = require('limbs-file/constants').events
  , Events = require('limbs-eventemitter')

module.exports = function ReloadTrait () {
  if (!require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")
  return function Reload (add) {
    var core = this
    var eventsConfig = {}
    eventsConfig[events.FileChanged] = function (location) {
      require('clear-module')(location)
      if (core.emit) core.emit('Reload', uri) }
    add(Events(eventsConfig))
    add(File()) } }
