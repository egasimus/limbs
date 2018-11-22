const Do = require('limbs-core/do')
    , events = require('limbs-file/constants').events
    , { filter } = require('rxjs/operators')
    , { realpathSync } = require('fs')
    , { resolve } = require('path')

module.exports = function ReloadTrait (main) {

  if (!require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")

  const MainReloaded = ([event, uri]) => {
    return event === 'RemovedFromRequireCache' && uri === main }

  return function Reload (state = {}) {

    const { Events, File } = state
    if (!Events || !File) {
      throw new Error(`'Events' or 'File' missing in ${Object.keys(state)}`)
    }

    const resolved = realpathSync(resolve(File.cwd, main))

    if (Object.keys(require.cache).indexOf(resolved) == -1) {
      throw new Error(`${resolved} missing in require.cache`)
    }

    Events.on(events.FileChanged,
      ([_, uri]) => require('./remove-from-require-cache')(
        state, realpathSync(resolve(File.cwd, uri))))

    const reloadSubscription = state.Events.stream.pipe(filter(MainReloaded))
      .subscribe(()=>{
        reloadSubscription.unsubscribe()
        Events.emit('Rerunning', main)
        setImmediate(()=>Do(state, ...require(main)))})

    Events.emit('ReloaderWaiting', main)

    return state } }
