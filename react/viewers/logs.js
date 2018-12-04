const { createElement: h } = require('react')
    , { connect } = require('react-redux')

module.exports = connect(

  (state, ownProps)=>{
    const topic = state.topics[ownProps.topic] || []
    const data = topic.map(id=>state.data[id])
    return { topic, data }
  }

)(function PlainTextViewer ({ topic, data }) {

  console.log(123, data)

  return h
    ( 'span'
    , null
    , ...data.map(datum =>
      h
      ( 'div'
      , null
      , h('strong', null, datum.t.toISOString())
      , JSON.stringify(datum.datum) )))

})


