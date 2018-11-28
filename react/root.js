const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(
  state=>({ deps: state.deps || {} })
)(props => h
  ( 'div'
  , { className: 'Root'
    , style: { ...abs(0, 0, 0, 0), background: '#000', color: '#eee', display: 'flex', flexFlow: 'column' } }
  // , require('./depth')()
  // , require('./time')()
  , ...Object.keys(props.deps).map(id=>{
      console.log(id, props.deps[id])
      return h(require('./structure'), { id })
    })
  , h(require('./prompt'))
  ))
