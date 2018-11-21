module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (state = {}) {

    const { Events } = state
    const { CheckFile, LoadFile } = require('./constants').commands

    // inherit configuration or create it with default values
    const File = state.File || {
      snapshot: true,
      watch:    true,
      cwd:      process.cwd(),
      glob:     [ '**/*', '!node_modules/**' ]}
   
    // update configs
    Object.assign(File, ...configs.map(cfg=>cfg||{}))

    // create public read-only accessors for config and methods
    if (!state.File) require('limbs-core/readonly')(state, 'File', File)
    require('limbs-core/methods')(require, './methods', state, 'File')

    // initial snapshot (recursive ls, aka: glob + stat)
    if (File.waitForSnapshot) File.snapshot()

    // watch for updates
    if (File.watch) {
      const gaze = new (require('gaze').Gaze)(
        File.glob, { cwd: File.cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('ready', () => {
        File.gaze && File.gaze.close()
        File.gaze = gaze
        Events.emit('Watching', File.cwd, File.glob) })
      gaze.on('all', (event, path) => {
        event = {
          'added':   'FileAdded',
          'changed': 'FileChanged',
          'deleted': 'FileDeleted'
        }[event]
        event && Events.emit(event, require('path').relative(File.cwd, path))
      }) }

    return state } }
