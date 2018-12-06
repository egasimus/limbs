const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { default: Tree } = require('react-d3-tree')

module.exports = connect(
  (state, ownProps)=>{
    const topic = state.topics[ownProps.topic]
    const data = state.data[topic[0]]
    return { topic, data }
  }
)(({ data }) => {

  return h(Tree, { data: require('./build')(data.datum) })

})
