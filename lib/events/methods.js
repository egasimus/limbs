var filter = require('rxjs/operators').filter

module.exports = {

  offAll: function ({ Events }) {
    Events.subscriptions.forEach(subscription=>subscription.unsubscribe()) },

  emit: function ({ Events }, ...args) { // send [<event>, <arg1>, ...<argN>] down the event stream
    Events.stream.next(args) },

  on: function ({ Events }, predicate, handler) {
    const subscription = Events.stream
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(handler)
    Events.subscriptions.push(subscription)
    return subscription},

  once: function ({ Events }, predicate, handler) {
    const subscription = Events.stream
      .pipe(filter(function (event) { return event[0] === predicate }))
      .subscribe(event=>{ // TODO: switch the order of these to implement 'DoNotUnsubscribeOnThrow'
        subscription.unsubscribe()
        handler(event) })
    Events.subscriptions.push(subscription)
    return subscription },

  off: function () {
    throw new Error('not implemented') },

  onAny: function () {
    throw new Error('not implemented') } }
