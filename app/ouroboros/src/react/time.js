const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
module.exports = () => h
  ( 'div'
  , { style: { ...abs(0,0,0,13/16*100+'%'), background: '#1e1e1e' } }
  , 'time view' )
