module.exports = mutateStep

async function simpleStep (state, prevStep, nextStep) {
  if (!nextStep) return state
  if (typeof nextStep === 'function') return await Promise.resolve(nextStep(state))
  return await Promise.resolve(nextStep) }

async function expandStep (state, prevStep, nextStep, Do) {
  if (nextStep && nextStep[Symbol.iterator]) return await Do(state, ...nextStep)
  return simpleStep(state, prevStep, nextStep) }

async function mutateStep (state, ...args) {
  const result = await expandStep(state, ...args)
  return result || state }
