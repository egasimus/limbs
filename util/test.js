const { existsSync } = require('fs')
require('./eachLib').forEach(package => {
  const testPath = require('path').resolve(__dirname, '..', 'lib', package, 'test.js')
  if (existsSync(testPath)) {
    try {
      require(testPath)
    } catch (e) {
      console.error('Error running tests for for ' + package)
      console.error(e)
    }
  } else {
    console.warn('No tests for ' + package)
  }
})
