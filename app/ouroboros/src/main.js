const Events  = require('limbs-events')
    , Files   = require('limbs-files')
    , Audit   = require('limbs-audit')
    , Refresh = require('limbs-run/refresh-require')
    , Run     = require('limbs-run/run')

module.exports = [

  Files({
    cwd:  require('path').resolve(__dirname, '..'),
    glob: ['**/*', '!node_modules/**', 'node_modules/limbs-*/*' ] }),

  Audit((state, event)=>{
    // console.log(event)
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (state.window) state.window.webContents.send('main-event', yaml)
    return yaml }),

  Run('./window', require),

]
