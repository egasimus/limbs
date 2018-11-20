module.exports = function RunTrait () {

  var tasks = Array.prototype.slice.call(arguments) // TODO: mix tasks and options
  
  return function Run (add) {

    add(require('limbs-eventemitter')())

    var core = this

    core.public.on('Run', function (event) {
      require('./parallel')(core, tasks, {}).then(
        function (results) {
          core.public.emit.apply(null, ['RunComplete'].concat(results))
        }) })

    if (core.waitForSnapshot) {
      setImmediate(function () { core.public.emit('Run') })
    } else {
      core.public.on('SnapshotTaken', function () { core.public.emit('Run') })
    } } }
