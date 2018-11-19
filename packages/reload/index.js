module.exports = function ReloadTrait () {
  if (!require || !require.cache) throw new Error(
    "global environment doesn't contain require.cache; are you in Node.js?")
  return function Reload (add) {
    var emit = this.emit
    add(require('limbs-file')({ onChanged: function (location) {
      require('clear-module')(location)
      emit && emit('Reload', uri) } })) } }
