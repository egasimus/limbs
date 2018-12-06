const { createElement: h } = require('react')
    , { abs } = require('../helpers/style')

module.exports = ({ cwd, current }) => h
( 'div'
, { className: 'Prompt'
  , style: { display: 'flex', ...abs('auto', 0, 0, 0), lineHeight: '1em', background: '#181818', color: '#eee' } }
, h
  ( 'div'
  , { style: { background: 'none', color: '#ffc200', padding: '0.5em', fontWeight: 'bold' } }
  , new Date().toISOString() )
, h
  ( 'div'
  , { style: { background: 'none', color: '#ffc200', padding: '0.5em', fontWeight: 'bold' } }
  , cwd)
, h
  ( 'input'
  , { style: { flexGrow: 1, background: 'none', border: 'none', color: '#fff', padding: '0 0.5em', outline: 'none' }
    , onKeyUp: event => {
        if (event.key === 'Enter') {
          console.log(event.target.value)
          // current.Launch(event.target.value)
          event.target.value = ''
        }
      } }
  , null)
)
