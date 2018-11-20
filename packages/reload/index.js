var File   = require('limbs-file')
  , events = require('limbs-file/constants').events
  , Events = require('limbs-eventemitter')

module.exports = function ReloadTrait (root) {

  if (!require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")

  return function Reload (state = {}) {

    console.log(state)

    const { Events, File } = state
    if (!Events || !File) throw new Error(`'Events' or 'File' missing in ${Object.keys(state)}`)

    Events.on(events.FileChanged, ([_, uri]) =>
      require('./reload')(state, uri)) } }
