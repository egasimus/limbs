const Audit   = require('./events/audit')
    , Files   = require('./files')
    , Run     = require('./run/run')

module.exports = [

  Files({ cwd: __dirname }),

  Audit((current, event)=>{
    // console.log(event)
    if (event[0] === 'Error') console.log(event[1])
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (current.window) current.window.webContents.send('main-event', yaml)
    return yaml }),

  Run('./electron', require),

  Run('./ws/api', require)

]
