module.exports = exports = factory
module.exports.default = factory

function factory () {
  return Array.prototype.reduce.call(arguments,
    installTrait, { traits: [], private: {}, public: {} }).public }

function installTrait (core, trait) {
  if (!trait) return core
  (core.traits.indexOf(trait.name) < 0) && core.traits.push(trait.name)
  return trait(core) }

module.exports.Private = function PrivateTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Private (core) { return limbs.reduce(attachLimb('private'), core) } }

module.exports.Public = function PublicTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Private (core) { return limbs.reduce(attachLimb('public'), core) } }

function attachLimb (type) {
  return function (core, limb) {
    if (typeof limb === 'function') limb = limb(core)
    if (limb) shallowCopy(core[type], limb)
    return core } }

function shallowCopy (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key] }) }
