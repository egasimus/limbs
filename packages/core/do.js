module.exports = exports = Do
module.exports.default = Do

async function Do (...args) {
  let state = undefined
  for (let i in args) {
    if (typeof args[i] === 'function') {
      state = await Promise.resolve(args[i](state))
    } else {
      state = await Promise.resolve(args[i])
    }
  }
  return state
}
