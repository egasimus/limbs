module.exports = dispatchingStep

async function simpleStep (current, prevStep, nextStep) {
  if (!nextStep) return current
  if (typeof nextStep === 'function') return await Promise.resolve(nextStep(current))
  return await Promise.resolve(nextStep) }

async function expandingStep (current, prevStep, nextStep, Do) {
  if (nextStep && nextStep[Symbol.iterator]) return await Do(current, ...nextStep)
  return simpleStep(current, prevStep, nextStep) }

async function mutatingStep (current, ...args) {
  const result = await expandingStep(current, ...args)
  return result || current }

async function dispatchingStep (current, prevStep, nextStep, Do) {
  if (nextStep) {
    let result
    if (typeof nextStep === 'function') {
      result = await Promise.resolve(nextStep(current))
    } else if (typeof nextStep === 'string') {
      nextStep = require(nextStep)
      if (nextStep[Symbol.iterator]) {
        result = await Do(current, ...nextStep)
      } else {
        result = await dispatchingStep(current, prevStep, nextStep, Do)
      }
    } else if (nextStep[Symbol.iterator]) {
      throw new Error(`S-expressions not supported yet: ${JSON.stringify(nextStep)}`)
    } else {
      result = await Promise.resolve(nextStep)
    }
    return result || current
  } else {
    return current
  }
}
