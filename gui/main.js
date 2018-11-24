const Audit   = require('../events/audit')
    , Files   = require('../files')
    , Run     = require('../run/run')

module.exports = [

  Files({
    cwd:  require('path').resolve(__dirname, '..'),
    glob: ['**/*', '!node_modules/**' ] }),

  Audit((state, event)=>{
    // console.log(event)
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (state.window) state.window.webContents.send('main-event', yaml)
    return yaml }),

  Run('./window', require),

]
