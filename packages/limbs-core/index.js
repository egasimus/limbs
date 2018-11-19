module.exports = exports = New
module.exports.default = New

function New () {
  return Array.prototype.reduce.call(arguments,
    function (core, trait) { return core.add(trait) },
    { public: {}
    , traits: []
    , has: function (trait) { return this.traits.indexOf(trait) > -1 }
    , add: function (trait) {
        if (!trait) return core
        if (typeof trait === 'function') {
          if (core.traits.indexOf(trait.name) < 0) core.traits.push(trait.name)
          var updated = trait(core)
          return (updated && typeof updated === 'object') ? updated : core }
        if (typeof trait === 'object') {
          Object.keys(trait).forEach(function (key) { core[key] = trait[key] })
          return core } } }).public }
