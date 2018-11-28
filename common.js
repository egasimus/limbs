module.exports = [
  require('./helpers/public')(
    { Deps:       require('./deps')
    , readOnly:   require('./helpers/readonly')
    , addMethods: require('./helpers/methods') }),
  require('./events')(),
  require('./refresh'),
  require('./ws')
]
