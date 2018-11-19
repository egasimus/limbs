var readdirSync = require('fs').readdirSync
var existsSync = require('fs').existsSync
var resolve = require('path').resolve
readdirSync(resolve(__dirname, 'packages')).sort().forEach(function (package) {
  package = resolve(__dirname, 'packages', package, 'test.js')
  if (existsSync) {
    try {
      require(package)
    } catch (e) {
      console.error(e)
    }
  } else {
    console.warn('No tests for ' + package)
  }
})
