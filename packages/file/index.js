module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (add) {

    var events    = this.events
      , emit      = this.public.emit
      , filter    = require('rxjs/operators').filter
      , relative  = require('path').relative
      , constants = require('./constants')
      , Set       = require('immutable').Set

    // merge configuration objects
    const config = Object.assign({
      snapshot: true,
      load:     true,
      watch:    true,
      cwd:      process.cwd(),
      glob:     [ '**/*', '!node_modules/**' ],
    }, ...configs.map(cfg=>cfg||{}))

    if (config.load) { // evented interface to filesystem; TODO req/res id ala plan9
      var handlers = {}
      handlers[constants.commands.CheckFile] = function (uri) { // file metadata
        require('./check')(cwd, uri).then(events.next) }
      handlers[constants.commands.LoadFile] = function (uri) { // file metadata
        require('./load')(cwd, uri).then(events.next) }
      add(require('limbs-eventemitter')(handlers)) }

    // initial snapshot (recursive ls, aka: glob + stat)
    if (config.snapshot) {
      // glob an initial snapshot of the directory contents
      const globbed = Set(require('globule').find(config.glob, { cwd: config.cwd }))
      // start on the next tick,
      // this allows any remaining traits to synchronously initialize first
      setImmediate(()=>{
        // when all globbed items have been checked, emit and unsubscribe
        let checked = Set()
        const snapshot = events
          .pipe(filter(([event])=>event===constants.events.FileChecked||event===constants.events.FileError))
          .subscribe(([_, uri])=>{
            checked = checked.add(uri)
            if (checked.equals(globbed)) {
              emit('SnapshotTaken', checked)
              snapshot.unsubscribe()
            } })
        // start checking items from the snapshot
        globbed.forEach(pathname=>emit(CheckFile, pathname)) }) }

    // watch for updates
    if (config.watch) {
      const gaze = new (require('gaze').Gaze)(config.glob, { cwd: config.cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('changed', path=>{
        const uri = relative(cwd, path)
        emit('FileChanged', uri) }) }

    // return actual configuration, made immutable
    // return Map(config)

  }

}


