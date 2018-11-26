console.log('Starting...')

const Deps = require('./deps')

const Do = require('./do')((...args) => {
  // console.log(args)
  return require('./steps')(...args)
})

const Events  = require('./events')
    , Files   = require('./files')
    , Refresh = require('./refresh')

const readOnly = require('./helpers/readonly')
    , addMethods = require('./helpers/methods')

const Entrypoint = require({
  'browser':  './gui/backend.js',
  'renderer': './gui/frontend.js'
}[process.type])

module.exports = Do(
  { Deps, readOnly, addMethods },
  Events(),
  Files({ cwd: __dirname }),
  Refresh,
  Entrypoint
).then(state=>{
  // Files.writeYAML(`data/${process.type}.deps.yml`, state.Deps)
  state.Events.emit('Initialized', state)
})
