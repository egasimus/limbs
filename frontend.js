module.exports = [

  require('./events/audit')((current, event)=>{

    if (event[0] === 'Error') {
      console.error(event[1].stack)
    } else {
      console.debug(event)
    }

    if (current.Redux && current.Redux.store) {
      require('./redux/dispatch')(current, 'system', event)
    }

  }),

  require('./run/rerun')(
    './redux', require),

  require('./run/rerun')(
    './react', require),

  require('./run/run')(current=>{

    current.WSIPC.client.subscribe(message=>{
      if (message[0] !== 'ServerDeps') return
      require('./redux/dispatch')(current, 'deps_backend', message[1]) })

    require('./redux/dispatch')(current, 'deps_frontend', current.Deps)

    current.Redux.store.dispatch(require('./redux/actions').Window(
      require('shortid').generate(), 'deps_backend', 'count_keys'))

    current.Redux.store.dispatch(require('./redux/actions').Window(
      require('shortid').generate(), 'deps_frontend', 'count_keys'))

    window.current = current
  
  })

]
