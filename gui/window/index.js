module.exports = (state = {}) => new Promise(ok=>{
  const { app } = require('electron')
  const updateWindow = () => ok(require('./update')(state))
  ;(state.window || app.isReady())
    ? updateWindow()
    : app.on('ready', updateWindow) })
