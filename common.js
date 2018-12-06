module.exports = [
  require('./helpers/public')(
    { Deps:       require('./run/deps').parents
    , readOnly:   require('./helpers/readonly')
    , addMethods: require('./helpers/methods') }),
  './events',
  './ws' ]
