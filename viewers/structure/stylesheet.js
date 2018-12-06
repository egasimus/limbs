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
      , 'color':            '#ffc200' } }
  , { selector: 'edge'
    , style:
      { 'width': 1
      , 'line-color':         '#ffc200'
      , 'curve-style':        'haystack'
      , 'arrow-scale': 2
      , 'mid-target-arrow-shape': 'triangle'
      , 'mid-target-arrow-fill':  'filled'
      , 'mid-target-arrow-color': '#ffc200'
      , 'source-endpoint':    'outside-to-node'
      , 'target-endpoint':    'outside-to-node' } } ]
