module.exports = exports = Executor()
module.exports.default = module.exports

function Executor (step = defaultStep) {
  return async function Do (...args) {
    let state = undefined, i = 0
    for (i in args) state = await step(state, args[i-1], args[i])
    return step(state, args[i], undefined) } }

async function defaultStep (state, prevStep, nextStep) {
  if (!nextStep) return state
  if (typeof nextStep === 'function') return await Promise.resolve(nextStep(state))
  return await Promise.resolve(nextStep) }
