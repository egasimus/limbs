const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('../../style')
    , Cytoscape = require('cytoscape')
    , Cola = require('cytoscape-cola')
    , CytoscapeComponent = require('react-cytoscapejs')

Cytoscape.use(Cola)

module.exports = connect(

  (state, ownProps)=>{
    const topic = state.topics[ownProps.topic]
    const data = state.data[topic[0]]
    return { topic, data }
  }

)(function CytoscapeViewer ({ topic, data }) {

  return h
    ( 'div'
    , { className: 'Structure'
      , style:
        { width: '320px'
        , height: '200px'
        , background: '#222'
        , position: 'relative' } }
    // , { style: { ...abs(0,0,0,0), background:'linear-gradient(#47a,#a74)', width: '100%', height: '100%' } }
    , h
      ( require('react-container-dimensions').default
      , null
      , ({ width, height }) =>
        h
        ( CytoscapeComponent
        , { style: { width, height }
          , elements: require('./build')(data.datum)
          , layout: require('./layout')
          , stylesheet: require('./stylesheet')
          }
        , null))) })
