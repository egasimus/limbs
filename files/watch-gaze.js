module.exports = (current) => {

  const gaze = new (require('gaze').Gaze)(current.Files.glob, { cwd: current.Files.cwd })

  // gaze.on('all', (event, path)=>{})
  gaze.on('ready', () => {
    current.Files.gaze && current.Files.gaze.close()
    current.Files.gaze = gaze
    current.Events.emit('Watching', current.Files.cwd, current.Files.glob) })

  Object.entries({
    'added':   'FileAdded',
    'changed': 'FileChanged',
    'deleted': 'FileDeleted'
  }).forEach(([gazeEvent, limbsEvent])=>{
    gaze.on(gazeEvent, path=>
      current.Events.emit(limbsEvent, require('path').relative(current.Files.cwd, path))) })

  return gaze }
