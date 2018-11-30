const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  state=>({ order: state.order })

)(function RootWindow ({ order }) {

  return h
    ( 'section'
    , { className: 'Shell'
      , style: { ...abs(0, 0, 0, 0), background: '#000', color: '#eee', display: 'flex', flexFlow: 'column' } }
    , ...order.map(id=>h(require('./item'), { id }))
    , h(require('./prompt'))
    )

})
