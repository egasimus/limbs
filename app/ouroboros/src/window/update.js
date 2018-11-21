module.exports = state => {
  if (!state.window) state = require('./create')(state)
  state.window.setSize(800, 600)
  state.window.loadFile(require('path').resolve(__dirname, '..', 'index.html'))
}
