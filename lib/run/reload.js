const Do = require('limbs-core/do')
    , events = require('limbs-files/constants').events
    , { realpathSync } = require('fs')
    , { resolve } = require('path')

module.exports = function ReloadTrait (main) {

  if (!require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")

  const MainReloaded = ([event, uri]) => {
    return event === 'WillReload' && uri === main }

  return function Reload (state = {}) {

    const { Events, File } = state
    if (!Events || !File) {
      throw new Error(`'Events' or 'File' missing in ${Object.keys(state)}`)
    }

    const resolved = realpathSync(resolve(File.cwd, main))

    if (Object.keys(require.cache).indexOf(resolved) == -1) {
      throw new Error(`${resolved} missing in require.cache`)
    }

    state.Reload = state.Reload || { reruns: {} }

    if (state.Reload.refresh) state.Reload.refresh.unsubscribe()
    state.Reload.refresh = state.Events.on(events.FileChanged,
      ([_, uri]) => require('./refresh-require-cache')(
        state, realpathSync(resolve(File.cwd, uri))))

    if (state.Reload.reruns[resolved]) state.Reload.reruns[resolved].unsubscribe()
    state.Reload.reruns[resolved] = state.Events.on(MainReloaded, () => {
      state.Reload.reruns[resolved].unsubscribe()
      Events.emit('WillRerun', resolved)
      setImmediate(()=>{
        Events.emit('BeforeRerun', resolved, state)
        Do(state, ...require(main))
        Events.emit('AfterRerun', resolved, state) }) })

    Events.emit('ReloaderWaiting', main)

    return state } }
