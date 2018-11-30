const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('../style')
    , Cytoscape = require('cytoscape')
    , Cola = require('cytoscape-cola')
    , CytoscapeComponent = require('react-cytoscapejs')

Cytoscape.use(Cola)

module.exports = function CytoscapeViewer ({ item }) {

  console.log('structure', item)

  const nodes = new Set(), edges = [], elements = [], parents = []

  Object.keys(item.data).forEach(target=>{
    nodes.add(target)
    for (let source of item.data[target]) {
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
                 , 'background-color': 'white'
                 , 'background-opacity': 0
                 , 'border-color': '#000'
                 , 'border-opacity': 1 }
        , data:
          { id: parent
          , label: parent.split('/').slice(-1)
          , parent: addParent(parent) }}) }
    return parent }

  [...nodes].forEach(id=>{
    let data = { id }
    if (data.id.indexOf('node_modules')>-1) return
    // data.parent = addParent(data.id)
    // if(!data.parent)return
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
    // , maxSimulationTime: 1000
    , infinite: true
    , nodeDimensionsIncludeLabels: true
    , padding: 0
    , nodeSpacing: node => node.isParent() ? 20 : 1
    // , flow: { axis: 'x', minSeparation: 30 }
  }

  const stylesheet =
    [ { selector: 'node'
      , style:
        { 'width':            'label'
        , 'height':           'label'
        , 'content':          'data(label)'
        , 'text-valign':      'center'
        , 'background-color': '#000'
        , 'background-opacity': 1
        , 'shape':            'rectangle'
        , 'color':            '#fff' } }
    , { selector: 'edge'
      , style:
        { 'width': 1
        , 'line-color':         '#000'
        , 'curve-style':        'haystack'
        , 'arrow-scale': 2
        , 'mid-target-arrow-shape': 'triangle'
        , 'mid-target-arrow-fill':  'filled'
        , 'mid-target-arrow-color': '#000'
        , 'source-endpoint':    'outside-to-node'
        , 'target-endpoint':    'outside-to-node' } }]

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
    , h(require('react-container-dimensions').default, null,
        ({ width, height }) =>
          h(CytoscapeComponent, { style: { width, height }, elements, layout, stylesheet }, null)))

}
