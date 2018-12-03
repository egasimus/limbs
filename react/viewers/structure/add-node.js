module.exports = (state, id) => {

  const { elements, addDependencies, addDirectories } = state
      , node = { id }

  if (!addDependencies) {
    if (id.indexOf('node_modules')>-1) return
  }

  if (addDirectories) {
    node.parent = require('./add-parent')(state, id)
    if (!node.parent) return
  }

  let label = id.split('/')

  node.label = (label[label.length-1] === 'index.js')
    ? label[label.length-2] + '/'
    : label[label.length-1]

  elements.push({ group: 'nodes', data: node }) }
