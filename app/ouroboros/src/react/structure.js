const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
module.exports = () => h
  ( 'div'
  , { style: { ...abs(0,13/16*100+'%',0,0), background:'#222' } }
  , 'structure view!' )
