module.exports = exports = New
module.exports.default = New

function New () {
  return Array.prototype.reduce.call(arguments,
    installTrait, { traits: [], private: {}, public: {} }).public }

function installTrait (core, trait) {
  if (!trait) return core
  if (core.traits.indexOf(trait.name) < 0) core.traits.push(trait.name)
  var updated = trait(core)
  return (updated && typeof updated === 'object') ? updated : core }

module.exports.Private = function PrivateTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Private (core) { return limbs.reduce(attachLimb('private'), core) } }

module.exports.Public = function PublicTrait () {
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
