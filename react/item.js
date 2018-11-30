const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')
    , viewers = require('./viewers')

module.exports = connect(

  (state, ownProps)=>(
    { item: state.items[ownProps.id]
    , expanded: state.expanded.indexOf(ownProps.id) > -1 })

)(function Item ({ item, expanded, dispatch }) {

  console.log(item, expanded)
  
  return h
    ( 'article'
    , { className: 'Item'
      , style:
        { width: '100%'
        , height: expanded?'45%':'2em'
        , overflow: 'hidden'
        , position: 'relative'
        , marginBottom: '1px' } }
    , h
      ( 'div'
      , { style:
          { ...abs(0, 'auto', 'auto', 0)
          , background: 'rgba(0,128,0,0.5)'
          , fontWeight: 'bold'
          , padding: '0.5em'
          , zIndex: 1
          , cursor: 'pointer'
          , userSelect: 'none' }
        , onClick: event =>
            dispatch({ type: expanded ? 'ItemCollapse' : 'ItemExpand', args: { id: item.id } })
        }
      , expanded ? '▼ ': '▶ '
      , item.id )
    , h
      ( 'div'
      , { style:
          { ...abs(0, 0, 'auto', 'auto')
          , background: 'rgba(0,128,0,0.5)'
          , fontWeight: 'bold'
          , padding: '0.5em'
          , zIndex: 1 } }
      , item.time.toISOString() )
    , expanded
      ? h( viewers[item.expandedView],  { item } )
      : h( viewers[item.collapsedView], { item } )
    )

})
