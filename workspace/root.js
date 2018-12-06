const { createElement: h } = require('react')
    , { connect } = require('react-redux')
    , { abs } = require('../helpers/style')

module.exports = connect(

  state=>state

)(function Workspace ({ current, windows, topics, data, cwd }) {

  return [
    h
    ( 'table'
    , { className: 'Workspace'
      , style: { background: '#000'
               , color: '#eee'
               , width: '100%'
               , minHeight: '100%'
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
            ( require('../viewers')[windows[id].viewer]
            , { topic: windows[id].topic }) ) ) ) ) )
         // , h(require('./viewers')[viewer], { topic }) ) ) 

    , h(require('./prompt'), { cwd, current })

    ]

})
