module.exports = function RunTrait (...tasks) {

  return function Run (add) {

    // TODO: mix tasks and options
    //
    const { emit } = this.public

    setImmediate(()=>
      runInParallel(tasks, {}).then(results=>
        emit('RunComplete', ...results)))

    // return require('immutable').List(tasks)

    function runInParallel (tasks, state) {
      return Promise.all(tasks.map(task=>runAsPromise(task, state))) }

    function runAsPromise (task, state) {
      if (task instanceof Promise) return task(actor.public, state)
      if (task instanceof Function) return Promise.resolve(task(actor.public, state))
      if (task instanceof Array) return runInSequence(task, state)
      if (typeof task === 'string') return actor.public.get(task).then(file=>
        require(file.meta.fullPath)(actor.public, state))
      throw new Error('unknown task spec: ' + task) }

    async function runInSequence (tasks, state) {
      for (let task in tasks) {
        let task = tasks[i]
        state = (task instanceof Array)
          ? await runInParallel(task, state)
          : await runAsPromise(task, state) }
      return state }

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

  }

}

