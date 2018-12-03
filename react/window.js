const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  (state, ownProps) => state.windows[ownProps.id]

)(function Window ({ id, topic, viewer, dimensions }) {

  return h
    ( 'section'
    , { className: 'Window'
      , style: { ...abs(0, 0, 0, 0), background: '#000', color: '#eee', display: 'flex', flexFlow: 'column' } }
    , h
      ( require('./viewers')[viewer]
      , { topic } )
    )

})
