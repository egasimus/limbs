module.exports = [

  require('./files')({ cwd: __dirname }),

  require('./events/audit')((current, event)=>{
    if (event[0] === 'Error') console.log(event[1])
    if (current.WSIPC.broadcast) current.WSIPC.broadcast(event)
    return require('./helpers/yaml')(event) }),

  require('./run/run')('./electron', require),

  require('./run/run')('./ws/api', require)

]
