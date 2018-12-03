const { createElement: h } = require('react')
    , { connect } = require('react-redux')

module.exports = connect(

  (state, ownProps)=>({ data: state.topics[ownProps.topic] })

)(function CountKeysViewer ({ topic, data }) {

  return h
    ( 'span'
    , null
    , h
      ( 'strong'
      , null
      , String(Object.keys(data||{}).length)
    , ' entries' ))

})
