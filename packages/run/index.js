module.exports = function RunTrait () {

  // TODO: mix tasks and options
  // TODO: maybe this module is unnecessary?
  // no tail call optimization in JS
  // so New(list)=>first(list)(),New(rest(list)) might be unreliable?
  // see whether asynchronicity may be shoehorned into reduce; compare with lua

  var tasks = Array.prototype.slice.call(arguments) 
  
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
