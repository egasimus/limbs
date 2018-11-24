const { filter } = require('rxjs/internal/operators/filter')

module.exports = {

  offAll: function ({ Events }) {
    Events.subscriptions.forEach(subscription=>subscription.unsubscribe()) },

  emit: function ({ Events }, ...args) { // send [<event>, <arg1>, ...<argN>] down the event stream
    Events.stream.next(args) },

  on: function ({ Events }, predicate, handler) {
    let subscription = Events.stream
      .pipe(filter(require('./conform-predicate')(predicate)))
      .subscribe(handler)
    Events.subscriptions.push(subscription)
    return subscription },

  once: function ({ Events }, predicate, handler) {
    const subscription = Events.on(predicate, (...args)=>{
      subscription.unsubscribe()
      handler(...args) })
    return subscription },

  off: function () {
    throw new Error('not implemented') },

  onAny: function () {
    throw new Error('not implemented') } }
