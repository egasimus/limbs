module.exports = [
  require('./files')({ cwd: __dirname }),
  require('./events/audit')((current, event)=>{
    // console.log(event)
    if (event[0] === 'Error') console.log(event[1])
    const yaml = require('./helpers/yaml')(require('./helpers/tojs')(event))
    if (current.window) current.window.webContents.send('main-event', yaml)
    return yaml }),
  require('./run/run')('./electron', require),
  require('./run/run')('./ws/api', require)
]
