console.log('Starting...')

const Deps       = require('./deps')
    , Do         = require('./do')((...args) => require('./steps')(...args))
    , Public     = require('./helpers/public')
    , Common     = require('./common')
    , Entrypoint = require({
        'browser':  './backend.js',
        'renderer': './frontend.js'
      }[process.type])

module.exports = [
  Public({ Deps }),
  Common,
  Entrypoint,
  state=>{
    state.Events.emit('Initialized', state)
    state.Events.once(['Refreshed', __filename], ()=>setImmediate(()=>{
      Do(state, ...require(__filename))
      console.log('pew pew')
    }))
  }
]

if (require.main === module) Do(module.exports)
