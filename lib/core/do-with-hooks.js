module.exports = exports = DoWithHooks
module.exports.default = DoWithHooks

async function DoWithHooks (
  hooks = {
    beforeAll:  ()=>undefined,
    beforeEach: (state, step)=>state,
    afterEach:  (state, step)=>state,
    afterAll:   state=>state
  },
  ...args
) {
  let state = beforeAll()
  for (let i in args) {
    const step = args[i]
    if (typeof step === 'function') {
      state = await Promise.resolve(afterEach(step(beforeEach(state, step)), step))
    } else {
      state = await Promise.resolve(afterEach(beforeEach(state, step), step))
    }
  }
  return afterAll(state)
}
