module.exports = (state = { deps: {} }, { type, args }) => {

  if (type === 'AddDeps') {
    state.deps[args.name] = args.tree
  }

  return state

}
