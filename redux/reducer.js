module.exports = (state = { deps: {} }, { type, args }) => {

  console.log('reducer', type, args)

  if (type === 'AddDeps') {
    state.deps = { ...state.deps, [args.name]: args.tree }
  }

  return { ...state }

}
