module.exports = function EventsTrait (...configs) {

  return function Events (state = {}) {

    // create or inherit event stream
    const Events = state.Events || {
      stream: new (require('rxjs').Subject)(),
      subscriptions: [] }

    // create public read-only accessors for config and methods
    if (!state.Events) require('../core/readonly')(state, 'Events', Events)
    require('../core/methods')(require, './methods', state, 'Events')

    configs.forEach(config=>config && config(state))

    return state } }
