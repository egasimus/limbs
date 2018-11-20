module.exports = function runAsPromise (core, task, state) {
  if (task instanceof Promise) return task(core.public, state)
  if (task instanceof Function) return Promise.resolve(task(core.public, state))
  if (task instanceof Array) return runInSequence(task, state)
  if (typeof task === 'string') {
    const location = require('path').resolve(core.public.cwd, task)
    return Promise.resolve(require(location)(core.public, state))
    // return core.public.get(task).then(file=>
    // require(file.meta.fullPath)(core.public, state))
  }
  throw new Error('unknown task spec: ' + task) }

