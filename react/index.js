module.exports = (state = {}) => {

  document.body.innerHTML = '<div id="Root">Initializing...</div>'

  state.React = state.React || {}

  state.React.root = document.getElementById('Root')

  const h = require('react').createElement
  state.React.vdom = h(
    require('react-redux').Provider,
    { store: state.Redux.store },
    h(require('./workspace')))

  state.React.rendered = require('react-dom').render(
    state.React.vdom,
    state.React.root)

  console.log('rendered')

  return state }
