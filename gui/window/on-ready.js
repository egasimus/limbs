module.exports = (window, cb) => {
  const { app } = require('electron')
  if (window || app.isReady()) {
    cb()
  } else {
    app.on('ready', cb)
  }
}
