module.exports = (current = {}) => {
  current.React =
    { root:   document.body.firstChild
    , vdom:  'Hello React'
    , render: require('react-dom').render
    , ...(current.React || {}) }
  current.React.rendered = current.React.render(
    current.React.vdom,
    current.React.root) }
