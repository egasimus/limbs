module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (add) {

    add(require('limbs-eventemitter')())

    var events    = this.events
      , on        = this.public.on
      , emit      = this.public.emit
      , relative  = require('path').relative
      , constants = require('./constants')

    // merge configuration objects
    const config = Object.assign({
      snapshot: true,
      load:     true,
      watch:    true,
      cwd:      this.public.cwd || process.cwd(),
      glob:     this.public.glob || [ '**/*', '!node_modules/**' ],
    }, ...configs.map(cfg=>cfg||{}))

    if (config.load) { // evented interface to filesystem; TODO req/res id ala plan9
      on(constants.commands.CheckFile, function (event) { // file metadata
        require('./check')(config.cwd, event[1]).then(events.next.bind(events)) })
      on(constants.commands.LoadFile, function (event) { // file metadata
        require('./load')(config.cwd, event[1]).then(events.next.bind(events)) }) }

    // initial snapshot (recursive ls, aka: glob + stat)
    if (config.snapshot) {
      this.waitForSnapshot = true
      require('./snapshot')(this, config.glob, config.cwd) }

    // watch for updates
    if (config.watch) {
      const gaze = new (require('gaze').Gaze)(config.glob, { cwd: config.cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('ready', function () {
        emit('Watching', config.cwd, config.glob) })
      gaze.on('changed', function (path) {
        const uri = relative(config.cwd, path)
        emit('FileChanged', uri) }) }

  }

}
