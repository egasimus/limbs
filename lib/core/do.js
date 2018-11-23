module.exports = exports = Executor(expandStep)
module.exports.default = exports

module.exports.Executor = Executor
module.exports.simpleStep = simpleStep
module.exports.expandStep = expandStep

function Executor (step) {
  return async function Do (...args) {
    let state = undefined, i = 0
    for (i in args) state = await step(state, args[i-1], args[i], Do)
    return step(state, args[i], undefined) } }

async function simpleStep (state, prevStep, nextStep) {
  if (!nextStep) return state
  if (typeof nextStep === 'function') return await Promise.resolve(nextStep(state))
  return await Promise.resolve(nextStep) }

async function expandStep (state, prevStep, nextStep, Do) {
  if (nextStep && nextStep[Symbol.iterator]) return await Do(state, ...nextStep)
  return simpleStep(state, prevStep, nextStep) }
