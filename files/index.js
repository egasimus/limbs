module.exports = function LocalFileSystemTrait (...configs) {

  return function LocalFileSystem (current = {}) {

    const { Events, readOnly, addMethods } = current
    const { CheckFile, LoadFile } = require('./constants').commands

    // inherit configuration or create it with default values
    const Files = current.Files || {
      snapshot: true,
      watch:    true,
      cwd:      process.cwd(),
      glob:     [ '**/*', '!node_modules/**' ]}

    // update configs
    Object.assign(Files, ...configs.map(cfg=>cfg||{}))

    // create public read-only accessors for config and methods
    if (!current.Files) readOnly(current, 'Files', Files)
    addMethods(require, './methods', current, 'Files')

    if (Files.waitForSnapshot) Files.snapshot()
    // if (Files.watch) Files.watcher = require('./watch-gaze')(current)
    if (Files.watch) Files.watcher = require('./watch-chokidar')(current)

    return current } }
