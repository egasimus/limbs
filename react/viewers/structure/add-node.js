module.exports = ({ elements }, id) => {

  let node = { id }

  if (id.indexOf('node_modules')>-1) return

  // node.parent = addParent(id)
  // if(!node.parent)return

  let label = id.split('/')

  node.label = (label[label.length-1] === 'index.js')
    ? label[label.length-2] + '/'
    : label[label.length-1]

  elements.push({ group: 'nodes', data: node }) }
