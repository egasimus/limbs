const
  builtin = require('builtin-modules')
, Module  = require('module')
, _load   = Module._load
, parents = {}

add(module, 'builtin-modules')
add(module, 'module')
add(module.parent, module.id)

Module._load = (request, parent, isMain) => {
  add(parent, request)
  return _load(request, parent, isMain) }

module.exports = parents

function add (parent, child) {
  if (builtin.indexOf(child) < 0) child = Module._resolveFilename(child, parent)
  if (!parents[child]) {
    parents[child] = [parent.filename]
  } else if (parents[child].indexOf(parent.filename) < 0) {
    parents[child].push(parent.filename) } }
