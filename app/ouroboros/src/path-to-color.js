const colors = require('chroma-js').cubehelix().rotations(3).lightness([0.3,0.3])

module.exports = function colorizeTree ({ name, children }, indent = 0, offset = 0, size = 1) {

  console.log(name, children, indent, offset, size)
  return `${[...Array(indent+1)].join(' ')}<span style="padding:0 0.5em;background:${colors(offset)};color:white">${name}</span>\n${children.map((node, i)=>{
    return colorizeTree(node, indent+1, offset+i*(size/children.length), size/children.length)
  }).join('')}`
  // const colorize = offset => node => {
    
  // }
  // tree.forEach(colorize(0))
  // paths.forEach(path=>{
  //   const fragments = path.split('/')
  //   fragments.reduce
  // })
  // console.log(paths)
  // return '<pre>' + tree.map(path=>{
  //   const color = '#345'
  //   return `<span style="color:${color}">${path}</span>`
  // }).join('\n') + '</pre>'

}
