module.exports =

[ current => { window.current = current }

, require('./events/audit')((current, event)=>{

    if (event[0] === 'Error') {
      console.error(event[1].stack)
    } else {
      console.debug(event)
    }

    if (current.Redux && current.Redux.store) {
      require('./redux/append')(current, 'system', event)
    }

  })

, require('./run/rerun')('./redux', require)

, require('./run/rerun')('./react', require)

, current => {

    const { generate } = require('shortid')

    const inject = (require, ...specs) =>
      cb => cb(current, ...specs.map(require))

    const injected = inject(require, './redux/append', './redux/actions')

    current.WSIPC.client.subscribe(message=>{
      if (message[0] !== 'ServerDeps') return
      injected(({ Redux }, append, { Window }) => {
        append(current, 'deps_backend', message[1])
        Redux.store.dispatch(Window(generate(), 'deps_backend', 'cytoscape')) }) })

    injected(({ Redux }, append, { Window }) => {
      append(current, 'deps_frontend', current.Deps)
      Redux.store.dispatch(Window(generate(), 'deps_frontend', 'cytoscape')) }) }

]
