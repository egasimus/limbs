const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
    , Cytoscape = require('cytoscape')
    , Cola = require('cytoscape-cola')
    , CytoscapeComponent = require('react-cytoscapejs')
    // , { Graph } = require('react-d3-graph')
    // , { ForceGraph, ForceGraphNode, ForceGraphArrowLink } = require('react-vis-force')

Cytoscape.use(Cola)

module.exports = state => {

  const nodes = new Set(), edges = [], elements = [], parents = []

  Object.keys(state.Deps).forEach(target=>{
    nodes.add(target)
    for (let source of state.Deps[target]) {
      nodes.add(source)
      edges.push({ source, target }) } })

  function addParent (id) {
    const parent = id.split('/').slice(0,-1).join('/')
    if (parent === '') return
    if (parents.indexOf(parent)===-1) {
      parents.push(parent)
      elements.push(
        { group: 'nodes'
        , style: { 'text-valign': 'top'
                 , 'text-halign': 'center'
                 , 'text-background-color': '#000'
                 , 'text-background-opacity': 1
                 , 'background-opacity': 0.1
                 , 'border-opacity': 0 }
        , data:
          { id: parent
          , label: parent.split('/').slice(-1)
          , parent: addParent(parent) }}) }
    return parent }

  [...nodes].forEach(id=>{
    let data = { id }
    if (data.id.indexOf('node_modules')>-1) return
    data.parent = addParent(data.id)
    if(!data.parent)return
    let label = data.id.split('/')
    data.label = (label[label.length-1] === 'index.js')
      ? label[label.length-2] + '/'
      : label[label.length-1]
    elements.push({ group: 'nodes', data }) })

  edges.forEach(data=>{
    if (data.source.indexOf('node_modules')>-1) return
    if (data.target.indexOf('node_modules')>-1) return
    elements.push({ group: 'edges', data }) })

  const style = { width: window.innerWidth, height: window.innerHeight }

  const layout =
    { name: 'cola'
    , randomize: true
    , refresh: 0.1
    // , maxSimulationTime: 10000
    , infinite: true
    , nodeDimensionsIncludeLabels: true
    , padding: 0
    , nodeSpacing: node => node.isParent() ? 20 : 2
    // , flow: { axis: 'y', minSeparation: 100 }
  }

  const stylesheet =
    [ { selector: 'node'
      , style:
        { 'width':            'label'
        , 'height':           'label'
        , 'content':          'data(label)'
        , 'text-valign':      'center'
        , 'background-color': '#888'
        , 'background-opacity': 0.5
        , 'shape':            'rectangle'
        , 'color':            'white' } }
    , { selector: 'edge'
      , style:
        { 'width': 1
        , 'line-color':         '#000'
        , 'curve-style':        'haystack'
        , 'mid-target-arrow-shape': 'triangle'
        , 'mid-target-arrow-fill':  'filled'
        , 'mid-target-arrow-color': '#000'
        , 'source-endpoint':    'outside-to-node'
        , 'target-endpoint':    'outside-to-node' } }]

  return h
    ( 'div'
    , { style: { ...abs(0,0,0,0), background:'#222', width: '100%', height: '100%' } }
    , ! state ? loading
      : h(CytoscapeComponent, { style, elements, layout, stylesheet }, null) ) }
