module.exports =
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
