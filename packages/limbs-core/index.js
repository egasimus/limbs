module.exports = exports = New
module.exports.default = New

function New () {
  return Array.prototype.reduce.call(arguments, installTrait, {
    traits: [],
    hasTrait: function hasTrait (trait) { return this.traits.indexOf(trait) > -1 },
    public: {} }).public }

function installTrait (core, trait) {
  if (!trait) return core
  if (core.traits.indexOf(trait.name) < 0) core.traits.push(trait.name)
  var updated = trait(core)
  return (updated && typeof updated === 'object') ? updated : core }

module.exports.Public = function PublicTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Public (core) { return limbs.reduce(attachLimb('public'), core) } }

module.exports.attachLimb = function attachLimb (type) {
  return function (core, limb) {
    if (typeof limb === 'function') limb = limb(core)
    if (limb && limb instanceof Object) core[type] = limb
    return core } }

function shallowCopy (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key] }) }
