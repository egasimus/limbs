const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
module.exports = () => h
  ( 'div'
  , { style: { ...abs(0,3/16*100+'%',0,6/16*100+'%'), background :'#202020' } }
  , 'depth view' )

