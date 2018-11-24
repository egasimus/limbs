const { createElement: h } = require('react')
    , { abs } = require('./style')
module.exports = state => h
  ( 'div'
  , { style: { ...abs(0, 0, 0, 0), background: '#181818', color: '#eee' } }
  , require('./depth')()
  , require('./time')()
  , require('./structure')(state)
  )
