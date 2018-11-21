const { symlinkSync } = require('fs')
const { resolve } = require('path')
const mkdirpSync = require('mkdirp').sync
require('./eachLib').forEach(addLinks.bind(null, 'lib'))
require('./eachApp').forEach(addLinks.bind(null, 'app'))
function addLinks (type, package) {
  require('./eachLib').forEach(lib=>{
    if (lib === package) return
    const target = resolve(__dirname, '..', 'lib', lib)
        , nm     = resolve(__dirname, '..', type, package, 'node_modules')
        , link   = resolve(nm, 'limbs-' + lib)
    // console.log(type, package, target, link)
    mkdirpSync(nm)
    try {
      symlinkSync(target, link)
      console.log('OK', link, target)
    } catch (e) {
      console.log(e.code, link, target)
    }
  })
}
