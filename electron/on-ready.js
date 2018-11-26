module.exports = (cb) => {
  const { app } = require('electron')
  if (app.isReady()) {
    cb()
  } else {
    app.on('ready', cb)
  }
}
