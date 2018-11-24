module.exports = state => Object.assign(state,
  { window: new (require('electron').BrowserWindow)({ frame: false }) })
