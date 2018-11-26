module.exports = (current = {}) => new Promise(ok=>{
  const updateWindow = () => ok(require('./update')(current))
  require('./on-ready')(updateWindow) })
