var filter = require('rxjs/operators').filter

module.exports = {

  emit: function (Events) { // send [<event>, <arg1>, ...<argN>] down the event stream
    Events.stream.next(Array.prototype.slice.call(arguments)) },

  on: function (Events, predicate, handler) {
    return Events.stream
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(handler) },

  once: function (Events, predicate, handler) {
    var subscription
    return subscription = Events.stream
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(event=>{
        // TODO: switch the order of these to implement 'DoNotUnsubscribeOnThrow'
        subscription.unsubscribe()
        handler(event) }) },

  off: function () {
    throw new Error('not implemented') },

  onAny: function () {
    throw new Error('not implemented') } }
