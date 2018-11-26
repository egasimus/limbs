module.exports = current => {
  if (!current.window) current = require('./create')(current)
  current.window.setSize(800, 600)
  current.window.loadFile(require('path').resolve(__dirname, '..', 'index.html'))
  return current }
