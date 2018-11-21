module.exports = function EventsTrait (...configs) {

  return function Events (state = {}) {

    // create or inherit event stream
    const Events = state.Events || { stream: new (require('rxjs').Subject)() }

    // create public read-only accessors for config and methods
    if (!state.Events) require('limbs-core/readonly')(state, 'Events', Events)
    require('limbs-core/methods')(require, './methods', state, 'Events')

    // bind any events specified as trait parameters
    configs.forEach(config => {
      if (!config) return
      if (typeof config === 'function') config = config(state)
      for (let event in config) Events.on(event, config[event]) })
  
    return state } }
