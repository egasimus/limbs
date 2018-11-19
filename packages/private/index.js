var attachLimb = require('limbs-core/helpers').attachLimb

module.exports = function PrivateTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Private (core) {
    if (!core.private) core.private = {}
    return limbs.reduce(attachLimb('private'), core) } }
