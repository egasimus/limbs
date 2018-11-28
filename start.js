console.log('Starting...')
require('./deps')
const Entrypoint = { 'browser': './backend.js', 'renderer': './frontend.js' }[process.type]
module.exports = [ require('./common'), require(Entrypoint), hotReload ]
if (require.main === module) require('./do')(require('./steps'))(module.exports)
function hotReload (current) {
  current.Events.emit('Initialized', current)
  const wait = () => current.Events.once(['Refreshed', __filename], reload)
  const reload = () => setImmediate(() => {
    try {
      require('./do')(require('./steps'))(current, ...require(__filename))
    } catch(e) {
      current.Events.emit('Error', e)
      require.failed = require.failed || {}
      require.failed[__filename] = e
      wait()
    } })
  wait() }
