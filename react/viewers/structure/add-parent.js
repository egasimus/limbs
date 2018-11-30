module.exports = (state, id) => {
  const parent = id.split('/').slice(0,-1).join('/')
  if (parent === '') return
  if (parents.indexOf(parent)===-1) {
    parents.push(parent)
    elements.push(
      { group: 'nodes'
      , style: { 'text-valign': 'top'
               , 'text-halign': 'center'
               , 'text-background-color': '#000'
               , 'text-background-opacity': 1
               , 'background-color': 'white'
               , 'background-opacity': 0
               , 'border-color': '#000'
               , 'border-opacity': 1 }
      , data:
        { id:     parent
        , label:  parent.split('/').slice(-1)
        , parent: addParent(parent) }}) }
  return parent
}
