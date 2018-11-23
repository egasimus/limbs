const step    = (...args) => require('./step')(...args)
    , Do      = require('limbs-core/do').Executor(step)
    , Events  = require('limbs-events')
    , Refresh = require('limbs-run/refresh-require')

Do(
  Events(),
  Refresh(),
  require({
    'browser':  './main.js',
    'renderer': './renderer.js'
  }[process.type]))
