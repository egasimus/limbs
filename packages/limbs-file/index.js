module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (core) {

    const { events, emit } = core.public

    const { filter, map, flatMap } = require('rxjs/operators')
    const { stat, readFile } = require('fs')
    const { resolve, relative } = require('path')
    const {
      commands: { CheckFile, LoadFile },
      events:   { FileLoaded, FileChecked, FileError }
    } = require('../../File')
    const { feedback } = require('../../helpers')
    const globule = require('globule')
    const { Gaze } = require('gaze')

    const { Map, Set } = require('immutable')
    const { from } = require('rxjs')

    // merge configuration objects
    const config = Object.assign({
      snapshot: true,
      load:     true,
      watch:    true,
      cwd:      process.cwd(),
      glob:     [ '**/*', '!node_modules/**' ],
    }, ...configs.map(cfg=>cfg||{}))

    const { glob, cwd } = config

    // main loader
    if (config.load) {

      // respond to metadata requests
      feedback(events,
        filter(([ event ])=>event===CheckFile),
        flatMap(([_, uri])=>require('./check')(cwd, uri)))

      // respond to data requests
      feedback(events,
        filter(([ event ])=>event===LoadFile),
        flatMap(([_, uri])=>require('./load')(cwd, uri))) }

    // initial snapshot
    if (config.snapshot) {

    // glob an initial snapshot of the directory contents
      const globbed = Set(globule.find(glob, { cwd }))

      // start on the next tick,
      // this allows the rest of the directives to synchronously initialize first
      setImmediate(()=>{

        // when all globbed items have been checked, emit and unsubscribe
        let checked = Set()
        const snapshot = events
          .pipe(filter(([event])=>event===FileChecked||event===FileError))
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
      const gaze = new Gaze(glob, { cwd, interval: 10, debounceDelay: 50 })
      // gaze.on('all', (event, path)=>{})
      gaze.on('changed', path=>{
        const uri = relative(cwd, path)
        emit('FileChanged', uri) }) }

    // return actual configuration, made immutable
    // return Map(config)

  }

}


