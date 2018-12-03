const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  (state, { id })=>({ ...state.windows[id] })

)(function Window (...args) {

  console.log(args)
  debugger
  const { id, topic, viewer, coordinates } = w
  console.log(w, id, topic, viewer, coordinates)

  return h
    ( 'section'
    , { className: 'Window'
      , style: { ...abs(0, 0, 0, 0), background: '#000', color: '#eee', display: 'flex', flexFlow: 'column' } }
    , h
      ( require('./viewers')[viewer]
      , { topic } )
    )

})
