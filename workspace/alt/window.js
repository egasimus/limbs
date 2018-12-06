const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  (state, ownProps) => state.windows[ownProps.id]

)(function Window ({ id, topic, viewer, dimensions }) {

  return h
    ( 'section'
    , { className: 'Window'
      , style: { width: '100%'
               , background: '#080808'
               , color: '#eee'
               , display: 'flex'
               , flexFlow: 'row'
               , position: 'relative'
               , alignItems: 'flex-start'
               , marginBottom: '1px'
               , lineHeight: 1 } }
    , h(require('./decoration'), { id })
    , h('div', { style: { flexGrow: 1 } }
       , h(require('./viewers')[viewer], { topic }) ) )

})
