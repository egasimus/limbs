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

    // create public read-only accessor
    if (!state.File)
      Object.defineProperty(state, 'File',
        { enumerable: true
        , get: () => File })

    // bind public helper methods
    Object.keys(require('./methods')).forEach(methodName =>
      File[methodName] || Object.defineProperty(File, methodName,
        { enumerable: true
        , get: () => (...args) => require('./methods')[methodName](state, ...args) }))

    // initial snapshot (recursive ls, aka: glob + stat)
    if (File.waitForSnapshot) File.snapshot()

    // watch for updates
    if (File.watch) {
      const gaze = new (require('gaze').Gaze)(
        File.glob, { cwd: File.cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('ready', () => Events.emit('Watching', File.cwd, File.glob))
      gaze.on('changed', path =>
        Events.emit('FileChanged', require('path').relative(File.cwd, path))) }

    return state } }
