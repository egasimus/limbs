function runInThisContext (file, ...args) {
  const { wrap, Module }     = require('module')
      , { runInThisContext } = require('vm')
      , { dirname, resolve } = require('path')
      , filename = file.meta.fullPath
      , m        = Object.assign(new Module(`dothot:${file.uri}`), { filename })
      , code     = wrap(file.data)
      , wrapped  = runInThisContext(code, { filename })
      , _dirname = dirname(filename)
      , _require = spec =>
          spec[0] === '.'
            ? require(resolve(_dirname, spec))
            : require(spec)
  wrapped(m.exports, _require, m, _dirname, filename)
  m.loaded = true
  return m.exports(...args) }

