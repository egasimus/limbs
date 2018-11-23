module.exports = (state = {}) => {
  try {
    document.body.innerHTML=''

    console.log('started')
    console.log(state)

    document.body.style.background='#1f1f1f'

    state.rendererRequireContainer = document.createElement('div')
    state.rendererRequireContainer.style.color = '#eee'
    state.rendererRequireContainer.style.background = '#222'
    state.rendererRequireContainer.style.position = 'absolute'
    state.rendererRequireContainer.style.overflow = 'hidden'
    state.rendererRequireContainer.style.top = 0
    state.rendererRequireContainer.style.bottom = 0
    state.rendererRequireContainer.style.left = 0
    state.rendererRequireContainer.style.width = 3/16*100+'%'

    let paths = Object.keys(require.cache).sort()
    let tree = require('path-list-to-tree').default(paths)
    console.log(tree)
    state.rendererRequireContainer.innerHTML =
      '<strong>' + paths.length + '</strong> modules in require.cache<pre>' +
        tree[0].children.map(node=>require('./path-to-color')(node))
      + '<pre>'

    document.body.appendChild(state.rendererRequireContainer)

    state.logsContainer = document.createElement('div')
    state.logsContainer.style.background = '#202020'
    state.logsContainer.style.color = '#eee'
    state.logsContainer.style.position = 'absolute'
    state.logsContainer.style.overflow = 'hidden'
    state.logsContainer.style.top = 0
    state.logsContainer.style.bottom = 0
    state.logsContainer.style.left = 3/16*100+'%'
    state.logsContainer.style.width = 6/16*100+'%'

    document.body.appendChild(state.logsContainer)

    // Object.keys(state).forEach(key=>state.logsContainer.innerHTML+=`${key} :: ${state[key]}<br>`)
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('main-event', (event, yaml)=>{
      state.logsContainer.innerHTML += `main :: ${yaml}<br>`
    })

    state.testContainer = document.createElement('div')
    state.testContainer.style.background = '#181818'
    state.testContainer.style.color = '#eee'
    state.testContainer.style.position = 'absolute'
    state.testContainer.style.overflow = 'hidden'
    state.testContainer.style.top = 0
    state.testContainer.style.bottom = 0
    state.testContainer.style.left = 9/16*100+'%'
    state.testContainer.style.width = 7/16*100+'%'

    ipcRenderer.on('test-event', (event, data)=>{
      state.testContainer.innerHTML += `${data}<br>`
    })

  } catch (e) {
    console.error(e)
  }

  return state
}
