module.exports = (state = {

  cwd: process.cwd(),
  command: '',

  items: {},
  order: [],
  expanded: [],
  currentFocus: null,

  deps: {}

}, { type, args }) => {

  console.log('reducer', type, args)

  if (type === 'ItemAdd') {
    return {
      ...state,
      items: { ...state.items, [args.id]: args },
      order: [ ...state.order, args.id ],
      expanded: [ ...state.expanded, args.id ]
    }
  }

  if (type === 'ItemExpand') {
    return {
      ...state,
      expanded: [ ...state.expanded.filter(id=>id!==args.id), args.id ]
    }
  }

  if (type === 'ItemCollapse') {
    return {
      ...state,
      expanded: [ ...state.expanded.filter(id=>id!==args.id) ]
    }
  }

  return { ...state }

}
