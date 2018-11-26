module.exports = function RunnerOn (predicate, fn, _require) {
  return async function RunOn (state = {}) {
    state.Events.on(predicate, event => {
      require('./run')(fn, _require)(state, event) })
    return state } }
