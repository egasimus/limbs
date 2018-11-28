const Deps    = require('./deps')
    , Public  = require('./helpers/public')
    , Events  = require('./events')
    , Refresh = require('./refresh')
    , IPC     = require('./electron/ipc')

const readOnly = require('./helpers/readonly')
    , addMethods = require('./helpers/methods')

module.exports = [
  Public({ Deps, readOnly, addMethods }),
  Events(),
  Refresh,
  IPC
]
