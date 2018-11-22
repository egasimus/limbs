module.exports = function CatchTrait (fn) {
  return function Catch (state) {
    // TODO state snapshot
    try {
      state = fn(state)
    } catch (e) {
      state.Events.emit('Error', e)
    }
    return state
  }
}
