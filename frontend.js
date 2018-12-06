module.exports =

[ current => { window.current = current }

, current => { current.WSIPC.onMessage = event => current.Events.emit(...event) }

, require('./events/audit')((current, event)=>{

    if (event[0] === 'Error') {
      console.error(event[1].stack)
    } else {
      console.debug(event)
    }

    if (current.Redux && current.Redux.store) {
      require('./workspace/reducer/append')(current, 'system', event)
    }

  })

, './workspace'

, './redux'

, './react'

, current => {

    const { generate } = require('shortid')

    const inject = (require, ...specs) =>
      cb => cb(current, ...specs.map(require))

    const injected = inject(require, './workspace/reducer/append', './workspace/reducer/actions')

    injected(({ Redux }, append, { Window }) => {
      // Redux.store.dispatch(Window(generate(), 'system', 'count_keys'))

      append(current, 'deps_frontend', current.Deps)
      Redux.store.dispatch(Window(generate(), 'deps_frontend', 'cytoscape')) })

    current.WSIPC.client.subscribe(message=>{
      if (message[0] !== 'ServerDeps') return
      injected(({ Redux }, append, { Window }) => {
        append(current, 'deps_backend', message[1])
        Redux.store.dispatch(Window(generate(), 'deps_backend', 'cytoscape')) }) }) }

]
