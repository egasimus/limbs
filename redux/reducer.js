module.exports = (state = {

  cwd: process.cwd(),
  command: '',
  outputs: [],
  items: {},
  focused: '',

  deps: {}

}, { type, args }) => {

  console.log('reducer', type, args)

  if (type === 'AddDeps') {
    state.deps = { ...state.deps, [args.name]: args.tree }
  }

  return { ...state }

}
