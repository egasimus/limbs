module.exports = (current) => {

  const choki = require('chokidar').watch(current.Files.cwd)
  console.log(choki)
  choki.on('ready', ()=>{
    // TODO emit snapshot
    choki.on('add', (path, stat)=>{
      current.Events.emit('FileAdded', require('path').relative(current.Files.cwd, path)) })
    choki.on('change', (path, stat)=>{
      current.Events.emit('FileChanged', require('path').relative(current.Files.cwd, path)) })
    choki.on('unlink', (path, stat)=>{
      current.Events.emit('FileDeleted', require('path').relative(current.Files.cwd, path)) }) })

  return current

}
