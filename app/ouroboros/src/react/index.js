module.exports = (state = {}) => {//
  document.body.innerHTML = '<div id="Root">Initializing...</div>'
  state.React = state.React || {}
  state.React.root = document.getElementById('Root')
  state.React.vdom = require('react').createElement(
    require('react-redux').Provider,
    { get store () { return state.Redux.store } },
    require('./root')())
  state.React.rendered = require('react-dom').render(state.React.vdom, state.React.root)
  console.log('reran')
  return state
}
