module.exports = exports =
  { factory: factory
  , Private: PrivateTrait
  , Public:  PublicTrait }

function factory () {
  return Array.prototype.reduce.call(arguments,
    installTrait, { traits: [], private: {}, public: {} }) }

function installTrait (core, trait) {
  if (!trait) return core
  (core.traits.indexOf(trait.name) < 0) && core.traits.push(trait.name)
  return trait(core) }

function PrivateTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Private (core) {
    limbs.forEach(function (limb) { copyTrait(core, core.private, limb) }) } }

function PublicTrait () {
  var limbs = Array.prototype.slice.call(arguments)
  return function Public (core) {
    limbs.forEach(function (limb) { copyTrait(core, core.public, limb) }) } }

function copyTrait (core, target, limb) {
  limb && shallowCopy(core.public,
    typeof limb === 'function' ? limb(core) : limb) }

function shallowCopy (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key] }) }
