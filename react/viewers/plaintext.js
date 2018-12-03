const { createElement: h } = require('react')
    , { connect } = require('react-redux')

module.exports = connect(

  (state, ownProps)=>{
    const topic = state.topics[ownProps.topic]
    console.log(ownProps.topic, state, topic)
    const data = state.data[topic[0]]
    return { topic, data }
  }

)(function PlainTextViewer ({ topic, data }) {

  return h
    ( 'span'
    , null
    , h
      ( 'strong'
      , null
      , String(data)))

})

