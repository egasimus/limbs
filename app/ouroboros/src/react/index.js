const Reload = require('limbs-reload')
    , Catch  = require('../catch')

module.exports = [

  Catch((state = {}) => {

    const { createStore }      = require('redux')
        , { createElement: h } = require('react')
        , { render }           = require('react-dom')
        , { Provider }         = require('react-redux')
        , { abs }              = require('./style')

    document.body.innerHTML = '<div id="Root">Initializing...</div>'

    state.reducer  = require('../redux')
    state.store    = state.store || createStore((...args)=>state.reducer(...args))
    state.vdom     = h(Provider, { get store () { return state.store } }, require('./root'))
    state.rendered = render(state.vdom, document.getElementById('Root'))

    return state

  }),

]
