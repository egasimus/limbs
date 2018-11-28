const Public  = require('./helpers/public')
    , Events  = require('./events')
    , Files   = require('./files')
    , Refresh = require('./refresh')
    , IPC     = require('./electron/ipc')

const readOnly = require('./helpers/readonly')
    , addMethods = require('./helpers/methods')

module.exports = [
  Public({ readOnly, addMethods }),
  Events(),
  Files({ cwd: __dirname }),
  Refresh,
  IPC
]
