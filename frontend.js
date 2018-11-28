const Audit  = require('./events/audit')
    , Run    = require('./run/run')
    , ReRun  = require('./run/rerun')

module.exports = [

  Audit(
    (current, event)=>{
      if (event[0] === 'Error') {
        console.error(...event.slice(1))
      } else {
        console.debug(event) } }),

  ReRun(
    './redux', require),

  ReRun(
    './react', require),

  Run(current=>{
    current.WSIPC.client.subscribe(message=>{
      if (message[0] === 'ServerDeps') current.Redux.store.dispatch(
        { type: 'AddDeps'
        , args: { name: 'backend', tree: message[1] } }) })
    current.Redux.store.dispatch(
      { type: 'AddDeps'
      , args: { name: 'frontend', tree: current.Deps } }) }),

]
