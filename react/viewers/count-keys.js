const { createElement: h } = require('react')
    , { connect } = require('react-redux')

module.exports = connect(

  (state, ownProps)=>({
    item: state.deps[ownProps.id] || {}
  })

)(function CountKeysViewer ({ item }) {

  return h
    ( 'span'
    , null
    , h
      ( 'strong'
      , null
      , String(Object.keys(item.data).length) )
    , ' entries' )

})
