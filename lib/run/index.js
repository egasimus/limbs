module.exports = function Runner (fn, _require) {
  return async function Run (state = {}) {
    // TODO state snapshot
    // TODO require snapshot
    try {
      if (typeof fn === 'string') fn = (...args) => _require(fn)(...args)
      state = await Promise.resolve(fn(state))
    } catch (e) {
      state.Events.emit('Error', e)
    }
    return state
  }
}
