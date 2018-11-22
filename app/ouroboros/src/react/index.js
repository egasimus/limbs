const Reload = require('limbs-reload')
    , Catch  = require('../catch')

module.exports = [
  Catch((state = {}) => {
    const { createStore }      = require('redux')
        , { createElement: h } = require('react')
        , { render }           = require('react-dom')
        , { Provider }         = require('react-redux')

    document.body.innerHTML = '<div id="Root">Initializing...</div>'

    state.reducer = (uiState = {}, op) => uiState
    state.store = state.store || require('redux').createStore((...args)=>state.reducer(...args))

    const abs = (top,right,bottom,left) => ({ position: 'absolute', top, right, bottom, left })

    state.vdom = h(Provider, { get store () { return state.store } }, h('div',
      { style: { ...abs(0, 0, 0, 0), background: '#181818', color: '#eee' } },
      h('div'
        ,{style:{...abs(0,13/16*100+'%',0,0),background:'#222'}}
        ,'structure view')
      ,h('div'
        ,{style:{...abs(0,3/16*100+'%',0,3/16*100+'%'),background:'#202020'}}
        ,'depth view')
      ,h('div'
        ,{style:{...abs(0,0,0,13/16*100+'%'),background:'#1e1e1e'}}
        ,'time view')))
    state.rendered = render(state.vdom, document.getElementById('Root'))
    console.log(state.rendered)
    return state
  }),

  Reload(__filename)
]

