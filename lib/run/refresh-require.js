const { realpathSync } = require('fs')
    , { resolve } = require('path')

module.exports = function RequireRefresher () {
  return function RefreshRequire (state = {}) {

    if (state.RefreshRequire) state.RefreshRequire.unsubscribe()

    state.RefreshRequire = state.Events.on('FileChanged', ([_, uri]) => {
      const location = realpathSync(resolve(state.Files.cwd, uri))
      if (Object.keys(require.cache).indexOf(location) == -1) return
      require('clear-module')(location)
      state.Events.emit('Refreshed', location) })

    return state } }
