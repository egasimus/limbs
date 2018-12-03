module.exports = ({ elements, addDependencies }, edge) => {

  if (!addDependencies) {
    if (edge.source.indexOf('node_modules')>-1) return
    if (edge.target.indexOf('node_modules')>-1) return
  }

  elements.push({ group: 'edges', data: edge }) }
