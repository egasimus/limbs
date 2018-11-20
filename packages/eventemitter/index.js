module.exports = function EventsTrait () {

  var configs = Array.prototype.slice.call(arguments)

  return function Events (add) {

    var core = this

    // create event stream and public read-only accessor
    if (!core.events) {
      this.events = new (require('rxjs').Subject)()
      Object.defineProperty(this.public, 'events',
        { enumerable: true, get: function () { return core.events } }) }

    // bind public helper methods
    ;['emit', 'on', 'off', 'once', 'onAny'].forEach(function (method) {
      if (!core.public[method]) Object.defineProperty(core.public, method,
        { enumerable: true, get: function () {
          return function () {
            return require('./methods')[method].apply(core, arguments) } } }) })

    // bind any events
    configs.forEach(function (config) {
      if (!config) return
      config = typeof config == 'function' ? config(core) : config
      Object.keys(config).forEach(function (event) {
        core.public.on(event, config[event]) }) }) } }
