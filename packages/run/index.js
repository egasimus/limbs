module.exports = function RunTrait () {
  var tasks = Array.prototype.slice.call(arguments)
  // TODO: mix tasks and options
  return function Run (add) {
    add(require('limbs-eventemitter')())
    var core = this
      , emit = this.public.emit
    setImmediate(function () {
      require('./parallel')(core, tasks, {}).then(function (results) {
        emit.apply(null, ['RunComplete'].concat(results)) }) }) } }
