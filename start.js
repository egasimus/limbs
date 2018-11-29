console.log('Starting...')

require('./run/deps')

const Entrypoint =
  { 'browser':  './backend.js'
  , 'renderer': './frontend.js'
  }[process.type]

module.exports =
  [ require('./common')
  , require(Entrypoint)
  , require('./run/hot')(__filename) ]

if (require.main === module) require('./do')(require('./steps'))(module.exports)
