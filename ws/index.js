module.exports = function WSIPC (current = {}) {

  current.WSIPC = current.WSIPC || {
    onMessage (message) {
      console.log('WSIPC', message) } }

  require({
    'browser':  './server',
    'renderer': './client'
  }[process.type])(current)

}
