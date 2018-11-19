module.exports = function EventsTrait () {
  var configs = Array.prototype.slice.call(arguments)
  return function Events (add) {
    console.log(this)
    this.events = new (require('rxjs').Subject)()
    Object.defineProperty(this.public, 'events',
      { enumerable: true, get: function () { return this.events }.bind(this) })
    ;['emit', 'on', 'off', 'once', 'onAny'].forEach(function (method) {
      Object.defineProperty(this.public, method,
        { enumerable: true, get: function () {
          return function () {
            return require('./methods')[method].apply(this, arguments) } } }) }.bind(this))
    configs.forEach(function (config) {
      if (!config) return
      var boundSpec = config(actor)
      Object.keys(boundSpec).forEach(function (event) {
        actor.public.on(event, boundSpec[event]) }) }) } }
