const { createElement: h } = require('react')
    , { abs } = require('./style')

module.exports = props =>
  h
  ( 'div'
  , { className: 'Prompt'
    , style: { display: 'flex', ...abs('auto', 0, 0, 0), lineHeight: '1em', background: '#111', color: '#eee' } }
  , h
    ( 'div'
    , { style: { background: 'darkred', padding: '0.5em' } }
    , '~/foo/bar')
  , h
    ( 'div'
    , { style: { padding: '0.5em' } }
    , 'the quick brown fox jumps over the lazy dog')
  , h
    ( 'div'
    , { style: { flexGrow: 1, padding: '0.5em' } }
    , null)
  , h
    ( 'div'
    , { style: { background: 'darkblue', padding: '0.5em' } }
    , new Date().toUTCString() )
  )
