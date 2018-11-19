var filter = require('rxjs/operators').filter

module.exports = {

  emit: function () { // send [<event>, <arg1>, ...<argN>] down the event stream
    this.events.next(Array.prototype.slice.call(arguments)) },

  on: function (predicate, handler) {
    return this.events
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(handler) },

  once: function (predicate, handler) {
    var subscription
    return subscription = this.events
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(event=>{
        // TODO: switch the order of these to implement 'DoNotUnsubscribeOnThrow'
        subscription.unsubscribe()
        handler(event) }) },

  off: function () {
    throw new Error('not implemented') },

  onAny: function () {
    throw new Error('not implemented') } }
