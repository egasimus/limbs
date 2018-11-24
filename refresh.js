module.exports = function Refresh (state = {}) {

  if (state.Refresh) state.Refresh.unsubscribe()

  state.Refresh = state.Events.on('FileChanged', ([_, uri]) => {

    const location = state.Files.resolve(uri)
    if (Object.keys(require.cache).indexOf(location) == -1) return

    const refreshList = []

    const add = location => {
      if (refreshList.indexOf(location) === -1) refreshList.push(location)
      if (state.Deps[location]) [...state.Deps[location]].forEach(dep=>add(dep)) }

    add(location)

    refreshList.forEach(location=>{
      require('clear-module')(location)
      delete state.Deps[location]
      state.Events.emit('Refreshed', location) })
  
  })

  return state

}
