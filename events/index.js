module.exports = function EventsTrait (...configs) {
  return function Events (state = {}) {
    const { readOnly, addMethods } = state
    // create or inherit event stream
    const Events = state.Events || {
      stream: new (require('rxjs/internal/Subject').Subject)(),
      subscriptions: [] }
    // create public read-only accessors for config and methods
    if (!state.Events) readOnly(state, 'Events', Events)
    addMethods(require, './methods', state, 'Events')
    configs.forEach(config=>config && config(state))
    return state } }
