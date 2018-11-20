module.exports = function runInParallel (core, tasks, state) {
  return Promise.all(tasks.map(function (task) {
    return require('./promise')(core, task, state) })) }

