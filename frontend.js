module.exports = [

  require('./events/audit')(
    (current, event)=>{
      if (event[0] === 'Error') {
        console.error(...event.slice(1))
      } else {
        console.debug(event) } }),

  require('./run/rerun')(
    './redux', require),

  require('./run/rerun')(
    './react', require),

  require('./run/run')(current=>{
    current.WSIPC.client.subscribe(message=>{
      if (message[0] === 'ServerDeps') current.Redux.store.dispatch(
        { type: 'AddDeps'
        , args: { name: 'backend', tree: message[1] } }) })
    current.Redux.store.dispatch(
      { type: 'AddDeps'
      , args: { name: 'frontend', tree: current.Deps } }) }),

]
