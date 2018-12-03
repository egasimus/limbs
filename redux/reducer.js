module.exports = (state = {

  x: 0,
  y: 0,
  w: window.innerWidth,
  h: window.innerHeight,

  windows: [],
  topics:  {},
  data:    {},

  cwd: process.cwd(),
  command: '',

}, action) => {

  const type = action.type
  delete action.type

  console.debug('Reduce', type, action)

  if (type === 'Datum')
    return { ...state, data:    { ...state.data,    [action.id]: action } }

  if (type === 'Topic')
    return { ...state, topics:  { ...state.topics,  [action.id]: action.data } }

  if (type === 'Window') {
    return { ...state, windows: { ...state.windows, [action.id]: action } }
  }

  // console.debug(state)

  return state

}
