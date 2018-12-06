console.log('Starting...')

require('./run/deps') // initialize dependency tracker

module.exports =
  [ './common'
  , { 'browser':  './backend.js'
    , 'renderer': './frontend.js'
    }[process.type] ]
  // , require('./run/hot')(__filename) ]

if (require.main === module) require('./do')(require('./steps'))(...module.exports)
