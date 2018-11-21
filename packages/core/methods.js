module.exports = (_require, spec, state, wrapper) =>
  Object.keys(require(spec)).forEach(name =>
    state[wrapper][name] || Object.defineProperty(state[wrapper], name,
      { enumerable: true
      , get: () => (...args) => _require('./methods')[name](state, ...args) }))
