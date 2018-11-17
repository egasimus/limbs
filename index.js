module.exports = exports =
  { factory: factory
  , Private: PrivateTrait
  , Public:  PublicTrait }

function factory () {
  var traits = Array.prototype.slice.call(arguments)
  var core = { traits: [], private: {}, public: {} }
  traits.forEach(function (installTrait) {
    installTrait(core)
    core.traits.push(trait.name) })
  return core.public }

function PrivateTrait (core, specs) {
  var specs = Array.prototype.slice.call(arguments)
  return function Private (core) {
    specs.forEach(function (spec) {
      spec && extend(core.private, spec(core)) }) } }

function PublicTrait (core, specs) {
  var specs = Array.prototype.slice.call(arguments)
  return function Public (core) {
    specs.forEach(function (spec) {
      spec && extend(core.public, spec(core) } } }

function extend (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key] }) }
