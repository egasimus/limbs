module.exports = (_require, spec, state, namespace) =>
  Object.keys(_require(spec)).forEach(name =>
    state[namespace][name] || require('./readonly')(state[namespace], name, (...args) =>
      _require('./methods')[name](state, ...args)))
