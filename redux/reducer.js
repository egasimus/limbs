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

  console.warn('Reduce', type, action)

  if (type === 'Datum')
    state = { ...state, data: { ...state.data, [action.id]: action } }

  if (type === 'Topic')
    state = { ...state, topics: { ...state.topics, [action.id]: action.data } }

  if (type === 'Window') {
    state = { ...state, windows: { ...state.windows, [action.id]: action } }
  }

  console.debug(state)

  return state

}
