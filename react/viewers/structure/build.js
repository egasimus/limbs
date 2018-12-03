module.exports = (data) => {

  const state =
    { nodes:    new Set()
    , edges:    []
    , parents:  new Set()
    , elements: []
    , addDirectories:  true
    , addDependencies: false }
  
  Object.keys(data).forEach(target=>{
    state.nodes.add(target)
    for (let source of data[target]) {
      state.nodes.add(source)
      state.edges.push({ source, target }) } })

  for (let id   of state.nodes) require('./add-node')(state, id)
  for (let edge of state.edges) require('./add-edge')(state, edge)

  return state.elements

}
