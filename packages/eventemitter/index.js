module.exports = function EventsTrait () {
  var configs = Array.prototype.slice.call(arguments)
  return function Events (add) {
    var core = this
    this.events = new (require('rxjs').Subject)()
    Object.defineProperty(this.public, 'events',
      { enumerable: true, get: function () { return this.events }.bind(this) })
    ;['emit', 'on', 'off', 'once', 'onAny'].forEach(function (method) {
      Object.defineProperty(core.public, method,
        { enumerable: true, get: function () {
          return function () {
            return require('./methods')[method].apply(this, arguments) } } }) })
    configs.forEach(function (config) {
      if (!config) return
      config = typeof config == 'function' ? config(core) : config
      Object.keys(config).forEach(function (event) {
        core.public.on(event, config[event]) }) }) } }
