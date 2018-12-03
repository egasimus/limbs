const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
    , viewers = require('./viewers')

module.exports = connect(

  (state, ownProps) => state.windows[ownProps.id]

)(function Decoration ({ id, topic, viewer, dimensions }) {

  let expanded = false

  return h
    ( 'nav'
    , { className: 'Decoration'
      , style:
        { flexShrink: 0
        , overflow:  'hidden'
        , position:  'relative'
        , display:   'flex'
        , zIndex:     1 } }
    , h('div', { style: { color: 'green', padding: '0 0.25em', cursor: 'pointer' } }, '📌 ')
    , h('div', { style: { color: 'green', padding: '0 0.25em', cursor: 'pointer' } }, expanded ? '▼ ': '▶ ')
    , h('div', { style: { color: 'green', fontWeight: 'bold', padding: '0 0.25em', cursor: 'pointer' } }, new Date().toISOString())
    , h('div', { style: { color: 'green', fontWeight: 'bold', padding: '0 0.75em 0 0.25em', cursor: 'pointer' } }, id)
    )

})
