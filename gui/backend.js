const Audit   = require('../events/audit')
    , Files   = require('../files')
    , Run     = require('../run/run')

module.exports = [

  Audit((state, event)=>{
    // console.log(event)
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (state.window) state.window.webContents.send('main-event', yaml)
    return yaml }),

  Run('./window', require),

  Run(( state = {} )=>{
    state.window.webContents.send('main-event', require('./helpers/yaml')(
      ['AddDeps', state.Deps]))
    return state
  })

]
