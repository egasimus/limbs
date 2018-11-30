const { createElement: h } = require('react')
    , { connect } = require('react-redux')

module.exports = function CountKeysViewer ({ item }) {

  return h
    ( 'span'
    , null
    , h
      ( 'strong'
      , null
      , String(Object.keys(item.data).length) )
    , ' entries' )

}
