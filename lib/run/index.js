module.exports = function Runner (fn, _require) {
  return [
    async function Run (state = {}) {
      // TODO state snapshot
      // TODO require snapshot
      try {
        state = await Promise.resolve(
          ((typeof fn === 'string')
            ? (...args) => _require(fn)(...args)
            : fn)(state))
      } catch (e) {
        state.Events.emit('Error', e)
      }
      return state
    }
  ]
}
