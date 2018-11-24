module.exports = {

  resolve ({ Files }, uri) {
    return require('fs').realpathSync(require('path').resolve(Files.cwd, uri)) },

  check ({ Files }, uri) {
    const { FileError, FileChecked } = require('./constants').events
        , fullPath = require('path').resolve(Files.cwd, uri)
    return new Promise(next=>
      require('fs').stat(fullPath, (error, fs)=>
        next(error
          ? [ FileError,   uri, error ]
          : [ FileChecked, uri, { fs, fullPath } ]))) },

  load ({ Files }, uri) {
    const { FileError, FileLoaded } = require('./constants').events
        , fullPath = require('path').resolve(Files.cwd, uri)
    return new Promise(next=>
      require('fs').readFile(fullPath, 'utf8', (error, data)=>
        next(error
          ? [ FileError,  uri, error ]
          : [ FileLoaded, uri, data  ]))) },

  snapshot (file) {

    // var CheckFile = require('./constants').commands
    //   , Set       = require('immutable').Set
    //   , find      = require('globule').find
    //   , filter    = require('rxjs/operators').filter

    // // glob an initial snapshot of the directory contents
    // var globbed = Set(find(glob, { cwd: cwd }))

    // // start on the next tick,
    // // this allows any remaining traits to synchronously initialize first
    // setImmediate(function () {
    //   // when all globbed items have been checked, emit and unsubscribe
    //   var checked = Set()
    //     , snapshot = core.events
    //       .pipe(filter(require('./is-checked-or-error')))
    //       .subscribe(function (event) {
    //         var uri = event[1]
    //         checked = checked.add(uri)
    //         if (checked.equals(globbed)) {
    //           core.events.next(['SnapshotTaken', checked.toJS().sort()])
    //           snapshot.unsubscribe() } })
    //   // start checking items from the snapshot
    //   core.events.next(['TakingSnapshot', globbed.length])
    //   globbed.forEach(function (uri) { core.events.next([constants.commands.CheckFile, uri]) }) })

  }

}
