const Do = require('limbs-core/do')
    , events = require('limbs-file/constants').events
    , { filter } = require('rxjs/operators')

module.exports = function ReloadTrait (main) {

  if (!require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")

  const MainReloaded = ([event, uri]) => {
    return event === 'RemovedFromRequireCache' && uri === main }

  return function Reload (state = {}) {

    const { Events, File } = state
    if (!Events || !File) throw new Error(`'Events' or 'File' missing in ${Object.keys(state)}`)

    Events.on(events.FileChanged, ([_, uri]) => require('./reload')(state, uri))

    const reloadSubscription = state.Events.stream.pipe(filter(MainReloaded))
      .subscribe(()=>{
        reloadSubscription.unsubscribe()
        Events.emit('Rerunning', main)
        setImmediate(()=>Do(state, ...require(main)))})

    Events.emit('ReloaderWaiting', main)

    return state } }
