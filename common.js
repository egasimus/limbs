module.exports = [

  require('./helpers/public')(
    { Deps:       require('./run/deps')
    , readOnly:   require('./helpers/readonly')
    , addMethods: require('./helpers/methods') }),

  require('./events')(),

  require('./run/refresh'),

  require('./ws')

]
