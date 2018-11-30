module.exports =
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
      , 'target-endpoint':    'outside-to-node' } } ]
