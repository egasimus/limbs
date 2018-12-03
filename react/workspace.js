const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  state=>({ windows: Object.keys(state.windows) })

)(function Workspace ({ windows }) {

  return h
    ( 'section'
    , { className: 'Workspace'
      , style: { ...abs(0, 0, 0, 0)
               , background: '#000'
               , color: '#eee'
               , display: 'flex'
               , flexFlow: 'column' } }
    , ...windows.map(id=>h(require('./window'), { id }))
    , h(require('./prompt'))
    )

})
