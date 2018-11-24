module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (state = {}) {

    const { Events, readOnly, addMethods } = state
    const { CheckFile, LoadFile } = require('./constants').commands

    // inherit configuration or create it with default values
    const Files = state.Files || {
      snapshot: true,
      watch:    true,
      cwd:      process.cwd(),
      glob:     [ '**/*', '!node_modules/**' ]}

    // update configs
    Object.assign(Files, ...configs.map(cfg=>cfg||{}))

    // create public read-only accessors for config and methods
    if (!state.Files) readOnly(state, 'Files', Files)
    addMethods(require, './methods', state, 'Files')

    // initial snapshot (recursive ls, aka: glob + stat)
    if (Files.waitForSnapshot) Files.snapshot()

    // watch for updates
    if (Files.watch) {
      const gaze = new (require('gaze').Gaze)(
        Files.glob, { cwd: Files.cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('ready', () => {
        Files.gaze && Files.gaze.close()
        Files.gaze = gaze
        Events.emit('Watching', Files.cwd, Files.glob) })
      gaze.on('all', (event, path) => {
        event = {
          'added':   'FileAdded',
          'changed': 'FileChanged',
          'deleted': 'FileDeleted'
        }[event]
        event && Events.emit(event, require('path').relative(Files.cwd, path))
      }) }

    return state } }
