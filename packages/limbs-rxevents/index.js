module.exports = function EventsTrait () {
  var configs = Array.prototype.slice.call(arguments)
  return function Events (core) {
    core.private.events = new (require('rxjs').Subject)()
    Object.defineProperty(core.public, 'events',
      { enumerable: true, get: function () { return core.private.events } })
    ;['emit', 'on', 'off', 'once', 'onAny'].forEach(function (method) {
      Object.defineProperty(core.public, method,
        { enumerable: true, get: function () {
          return function () {
            return require('./methods')[method].apply(core, arguments) } } }) })
    configs.forEach(function (config) {
      if (!config) return
      var boundSpec = config(actor)
      Object.keys(boundSpec).forEach(function (event) {
        actor.public.on(event, boundSpec[event]) }) }) } }
