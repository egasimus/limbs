module.exports = function Refresh (state = {}) {
  if (state.Refresh) state.Refresh.unsubscribe()
  state.Refresh = state.Events.on('FileChanged', ([_, uri]) => {
    const location = state.Files.resolve(uri)
    if (Object.keys(require.cache).indexOf(location) == -1) return
    require('clear-module')(location)
    state.Events.emit('Refreshed', location) })
  return state }
