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
        { type: 'ItemAdd'
        , args:
          { id:   'deps_backend'
          , time:  new Date()
          , data:  message[1]
          , expandedView: 'cytoscape'
          , collapsedView: 'count_keys'
          } }) })
    current.Redux.store.dispatch(
      { type: 'ItemAdd'
      , args:
        { id:   'deps_frontend'
        , time:  new Date()
        , data:  current.Deps
        , expandedView: 'cytoscape'
        , collapsedView: 'count_keys'
        } }) }),

]
