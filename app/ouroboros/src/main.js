const Events = require('limbs-eventemitter')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-reload')

let snapshotTaken = false

let counter = 0

module.exports = [

  (state={})=>{counter++; return {...state,counter}},

  Events(),

  File({
    cwd:  require('path').resolve(__dirname, '..'),
    glob: ['**/*', '!node_modules/**', 'node_modules/limbs-*/*' ]
    // waitForSnapshot: true
  }),

  Audit((state, event)=>{
    if (event[0] === 'SnapshotTaken') { snapshotTaken = true }
    if (event[0] === 'SnapshotTaken') event = ['SnapshotTaken', event[1].length]
    if (!snapshotTaken && (['CheckFile', 'FileChecked'].indexOf(event[0]) > -1)) return
    if (event[0] === 'RunComplete') event[1] = Object.assign({}, event[1], { events: '...' })
    const yaml = require('./yaml')(require('./tojs')(event))
    if (state.window) state.window.webContents.send('main-event', yaml)
    return yaml }),

  async function main (state = {}) {
    // console.log(state)
    const { app } = require('electron')
    if (state.window || app.isReady()) {
      require('./window/update')(state)
    } else {
      app.on('ready', ()=>require('./window/update')(state))
    }
    return state
  },

  Reload(__filename)

]
