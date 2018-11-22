module.exports = function CatchTrait (fn) {
  return async function Catch (state = {}) {
    // TODO state snapshot
    try {
      state = await Promise.resolve(fn(state))
    } catch (e) {
      state.Events.emit('Error', e)
    }
    return state
  }
}
