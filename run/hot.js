module.exports = entrypoint => function hotReload (current) {
  const wait = () => current.Events.once(['Refreshed', entrypoint], reload)
  const reload = () => setImmediate(() => {
    try {
      require('../do')(require('../steps'))(current, ...require(entrypoint))
    } catch(e) {
      current.Events.emit('Error', e)
      require.failed = require.failed || {}
      require.failed[entrypoint] = e
      wait()
    } })
  wait() }
