const Audit   = require('../events/audit')
    , Files   = require('../files')
    , Run     = require('../run/run')

module.exports = [

  Audit((current, event)=>{
    // console.log(event)
    if (event[0] === 'Error') console.log(event[1])
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (current.window) current.window.webContents.send('main-event', yaml)
    return yaml }),

  Run('./window', require),

  Run(( current = {} )=>{
    require('./window/on-ready')(current.window, ()=>{
      // current.window.webContents.on('deps', ()=>{
      //   console.log('requested deps')
        const deps = require('./helpers/yaml')(['AddDeps', current.Deps])
        current.window.webContents.send('main-event', deps)
      // })
    })
    return current })

]
