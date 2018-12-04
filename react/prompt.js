const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  (state, ownProps) => ({
    cwd: state.cwd,
    command: state.command
  })

)(props => h
  ( 'div'
  , { className: 'Prompt'
    , style: { display: 'flex', ...abs('auto', 0, 0, 0), lineHeight: '1em', background: '#181818', color: '#eee' } }
  , h
    ( 'div'
    , { style: { background: 'none', color: 'blue', padding: '0.5em', fontWeight: 'bold' } }
    , new Date().toISOString() )
  , h
    ( 'div'
    , { style: { background: 'none', color: 'tomato', padding: '0.5em', fontWeight: 'bold' } }
    , props.cwd)
  , h
    ( 'input'
    , { style: { flexGrow: 1, background: 'none', border: 'none', color: '#fff', padding: '0 0.5em' }
      , onKeyUp: event => {
          if (event.key === 'Enter') {
            console.log(event.target.value)
            event.target.value = ''
          }
        } }
    , null)
  ))
