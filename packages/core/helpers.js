module.exports = exports = { Public: PublicTrait, attachLimb: attachLimb }

function PublicTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Public (core) { return limbs.reduce(attachLimb('public'), core) } }

function attachLimb (type) {
  return function (core, limb) {
    if (typeof limb === 'function') limb = limb(core)
    if (limb && limb instanceof Object) core[type] = limb
    return core } }

function shallowCopy (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key] }) }

