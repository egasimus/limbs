module.exports = function Runner (fn, _require) {
  return async function Run (current = {}) {
    try {
      if (typeof fn === 'string') {
        const _fn = fn
        fn = (...args) => _require(_fn)(...args) }
      const result = await Promise.resolve(fn(current))
      return result
    } catch (e) {
      current.Events.emit('Error', e)
    }
    return current
  }
}

// TODO state snapshot for reversion after error
// TODO require tree snapshot
