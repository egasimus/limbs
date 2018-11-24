module.exports = function RequireRefresher () {

  return function RefreshRequire (state = {}) {

    state.Refresh = state.Refresh || {}

    if (state.Refresh.subscription) state.Refresh.subscription.unsubscribe()

    state.Refresh.subscription = state.Events.on('FileChanged', ([_, uri]) => {
      const location = state.Files.resolve(uri)
      if (Object.keys(require.cache).indexOf(location) == -1) return
      require('clear-module')(location)
      state.Events.emit('Refreshed', location) })

    // state.Refresh.graph = state.Refresh.graph || require('graph-data-structure')()

    // Module._load = (request, parent, isMain) => {
    //   const root = resolve(__dirname, '..', '..')
    //   const parentId = relative(root, parent.id)
    //   const childId = isBuiltIn(request) ? request : relative(root, Module._resolveFilename(request, parent))
    //   state.Refresh.graph.removeEdge(parentId, childId)
    //   state.Refresh.graph.addEdge(parentId, childId)
    //   return originalLoad(request, parent, isMain) }

    return state } }
