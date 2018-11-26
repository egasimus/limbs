const
  builtin = new Set(require('builtin-modules'))
, Module  = require('module')
, _load   = Module._load
, tree    = {}

function dep (parent, child) {
  if (!builtin.has(child)) child = Module._resolveFilename(child, parent)
  tree[child] = tree[child] || new Set()
  tree[child].add(parent.filename) }

// dep(require.main, module)
dep(module, 'builtin-modules')
dep(module, 'module')
dep(module, 'path')

Module._load = (request, parent, isMain) => {
  dep(parent, request)
  return _load(request, parent, isMain) }

module.exports = tree
