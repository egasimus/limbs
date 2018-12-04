const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('./style')

module.exports = connect(

  state=>state

)(function Workspace ({ windows, topics, data }) {

  return [
    h
    ( 'table'
    , { className: 'Workspace'
      , style: { ...abs(0, 0, 0, 0)
               , background: '#000'
               , color: '#eee'
               , display: 'flex'
               , flexFlow: 'column'
               , borderCollapse: 'collapse' } }
    , h
      ( 'tbody'
      , { style: { background: '#080808' } }
      , ...Object.keys(windows).map(id=>h
        ( 'tr'
        , { className: 'Window'
          , style: { width: '100%'
                   , background: '#080808'
                   , color: '#eee'
                   , lineHeight: 1
                   , verticalAlign: 'top' } }
        , h
          ( 'td'
          , { style: { color: '#ffc200' } }
          , '📌')
        , h
          ( 'td'
          , { style: { color: '#ffc200' } }
          , '☰')
        , h
          ( 'td'
          , { style: { color: '#ffc200' } }
          , new Date().toISOString())
        , h
          ( 'td'
          , { style: { color: '#ffc200', fontWeight: 'bold' } }
          , windows[id].topic)
        , h
          ( 'td'
          , { width: '*' }
          , h
            ( require('./viewers')[windows[id].viewer]
            , { topic: windows[id].topic }) ) ) ) ) )
         // , h(require('./viewers')[viewer], { topic }) ) ) 

    , h(require('./prompt'))

    ]

})
