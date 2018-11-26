module.exports = (current = {}) => new Promise(ok=>{
  const updateWindow = () => ok(require('./update')(current))
  require('./on-ready')(current.window, updateWindow) })
