module.exports = (fn, _require) => [
  require('./run')(fn, _require),
  require('./run-on')([ 'Refreshed', _require.resolve(fn) ], fn, _require)
]
