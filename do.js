module.exports = exports = function Executor (step) {
  return async function Do (...args) {
    let state = undefined
      , i = 0
    for (i in args) state = await step(state, args[i-1], args[i], Do)
    return step(state, args[i], undefined)
  }
}
