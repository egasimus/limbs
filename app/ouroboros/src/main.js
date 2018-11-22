const Events = require('limbs-events')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-reload')
    , Catch  = require('./catch')

let snapshotTaken = false

let counter = 0

module.exports = [

  (state={})=>{counter++; return {...state,counter}},

  Events(({ Events })=>{
    Events.offAll()
    Events.once('SnapshotTaken', () => { snapshotTaken = true }) }),

  File({
    cwd:  require('path').resolve(__dirname, '..'),
    glob: ['**/*', '!node_modules/**', 'node_modules/limbs-*/*' ] }),

  Audit((state, event)=>{
    if (event[0] === 'SnapshotTaken') event = ['SnapshotTaken', event[1].length]
    if (!snapshotTaken && (['CheckFile', 'FileChecked'].indexOf(event[0]) > -1)) return
    if (event[0] === 'RunComplete') event[1] = Object.assign({}, event[1], { events: '...' })
    const yaml = require('./yaml')(require('./tojs')(event))
    if (state.window) state.window.webContents.send('main-event', yaml)
    return yaml }),

  Catch((state = {}) => new Promise(ok=>{
    const { app } = require('electron')
    const updateWindow = () => ok(require('./window/update')(state))
    ;(state.window || app.isReady())
      ? updateWindow()
      : app.on('ready', updateWindow) })),

  Reload(__filename)

]
