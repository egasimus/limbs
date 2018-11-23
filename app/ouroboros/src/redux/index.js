module.exports = (state = {}) => {
  state.Redux = state.Redux || {}
  state.Redux.reducer = require('./reducer')
  state.Redux.store = state.Redux.store || require('redux').createStore(
    (...args)=>state.Redux.reducer(...args))
  return state }
