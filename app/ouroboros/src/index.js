const Module = require('module')
    , originalLoad = Module._load
    , isBuiltIn = require('is-builtin-module')
    , { resolve, relative } = require('path')
    , graph = require('graph-data-structure')()

Module._load = (request, parent, isMain) => {
  const root = resolve(__dirname, '..', '..', '..')
  const parentId = relative(root, parent.id)
  const childId = isBuiltIn(request) ? request : relative(root, Module._resolveFilename(request, parent))
  graph.removeEdge(parentId, childId)
  graph.addEdge(parentId, childId)
  return originalLoad(request, parent, isMain) }

require('graph-data-structure')()

const step    = (...args) => require('./step')(...args)
    , Do      = require('limbs-core/do').Executor(step)
    , Events  = require('limbs-events')
    , Refresh = require('limbs-run/refresh-require')

Do(
  { Refresh: { graph } },
  Events(),
  Refresh(),
  require({
    'browser':  './main.js',
    'renderer': './renderer.js'
  }[process.type])).then(state=>console.log(state))
