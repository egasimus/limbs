module.exports = current => {
  const h = require('react').createElement
  current.Redux = { get reducer () { return require('./reducer') } }
  current.React = { get vdom () { return h
    (require('react-redux').Provider
    , { get store () { return current.Redux.store } }
    , h(require('./root'), { current })) } } }
