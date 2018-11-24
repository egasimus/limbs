const Files  = require('../files')
    , Audit  = require('../events/audit')
    , ReRun  = require('../run/rerun')

module.exports = [

  Files(
    { cwd: __dirname }),

  Audit(
    (state, event)=>{
      if (event[0] === 'Error') {
        console.error(event.slice(1))
      } else {
        console.debug(event) } }),

  ReRun(
    './redux', require),

  ReRun(
    './react', require),

]
