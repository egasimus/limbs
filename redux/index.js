module.exports = current => {
  current.Redux = current.Redux || {}
  current.Redux.store = current.Redux.store || require('redux').createStore(
    (...args)=>current.Redux.reducer(...args))
  return current }
