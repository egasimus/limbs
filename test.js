var readdirSync = require('fs').readdirSync
var existsSync = require('fs').existsSync
var resolve = require('path').resolve
readdirSync(resolve(__dirname, 'packages')).sort().forEach(function (package) {
  var packagePath = resolve(__dirname, 'packages', package, 'test.js')
  if (existsSync) {
    try {
      require(packagePath)
    } catch (e) {
      console.error('Error running tests for for ' + package)
      console.error(e)
    }
  } else {
    console.warn('No tests for ' + package)
  }
})
