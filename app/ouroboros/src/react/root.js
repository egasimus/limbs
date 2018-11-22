const { createElement: h } = require('react')
    , { abs } = require('./style')
module.exports = () => h
  ( 'div'
  , { style: { ...abs(0, 0, 0, 0), background: '#181818', color: '#eee' } }
  , require('./structure')()
  , require('./depth')()
  , require('./time')())
