module.exports = function RunnerOn (predicate, fn, _require) {
  return async function RunOn (state = {}) {
    console.log('WillRunOn', predicate, fn)
    state.Events.on(predicate, event => {
      console.log('RunOn', predicate)
      require('./run')(fn, _require)(state, event)
    })
    return state
  }
}
