const Deps = require('./deps')

const Do = require('./do')((...args) => {
  console.log(args)
  return require('./steps')(...args)
})

const Events  = require('./events')
    , Refresh = require('./refresh')

const readOnly = require('./helpers/readonly')
    , addMethods = require('./helpers/methods')

const Entrypoint = require({
  'browser':  './gui/main.js',
  'renderer': './gui/renderer.js'
}[process.type])

module.exports = Do(
  { Deps, readOnly, addMethods },
  Events(),
  Refresh,
  Entrypoint
).then(state=>{
  state.Events.emit('Initialized', state)
})
