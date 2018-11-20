module.exports = function EventsTrait (...configs) {

  return function Events (state = {}) {

    // create or inherit event stream
    const Events = state.Events || {
      stream: new (require('rxjs').Subject)()
    }

    // create public read-only accessor
    if (!state.Events)
      Object.defineProperty(state, 'Events',
        { enumerable: true
        , get: () => Events })

    // bind public helper methods
    Object.keys(require('./methods')).forEach(methodName =>
      Events[methodName] || Object.defineProperty(Events, methodName,
        { enumerable: true
        , get: () => (...args) => require('./methods')[methodName](state, ...args) }))

    // bind any events specified as trait parameters
    configs.forEach(config => {
      if (!config) return
      if (typeof config === 'function') config = config(state)
      for (let event in config) Events.on(event, config[event]) })
  
    return state } }
