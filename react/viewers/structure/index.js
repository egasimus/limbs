const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('../../style')
    , Cytoscape = require('cytoscape')
    , Cola = require('cytoscape-cola')
    , CytoscapeComponent = require('react-cytoscapejs')

Cytoscape.use(Cola)

module.exports = function CytoscapeViewer ({ item }) {

  return h
    ( 'div'
    , { className: 'Structure'
      , style:
        { width: '100%'
        , height: '100%'
        , background: '#777'
        , borderTop: '1px solid #aaa'
        , borderLeft: '1px solid #aaa'
        , borderBottom: '1px solid #555'
        , borderRight: '1px solid #555'
        , position: 'relative' } }
    // , { style: { ...abs(0,0,0,0), background:'linear-gradient(#47a,#a74)', width: '100%', height: '100%' } }
    , h
      ( require('react-container-dimensions').default
      , null
      , ({ width, height }) =>
        h
        ( CytoscapeComponent
        , { style: { width, height }
          , elements: require('./build')(item.data)
          , layout: require('./layout')
          , stylesheet: require('./stylesheet')
          }
        , null))) }
