const Events = require('limbs-eventemitter')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-reload')

module.exports = [

  Events(),

  File({ cwd: __dirname }),

  Audit((state, event)=>{
    state.logsContainer && (state.logsContainer.innerHTML += `renderer :: ${require('./yaml')(event)}<br>`)
  }),

  (state = {}) => {
    try {
      document.body.innerHTML=''
      console.log('started')
      console.log(state)

      state.logsContainer = document.createElement('div')
      state.logsContainer.style.background = '#222'
      state.logsContainer.style.color = '#eee'
      state.logsContainer.style.position = 'absolute'
      state.logsContainer.style.overflow = 'auto'
      state.logsContainer.style.top = 0
      state.logsContainer.style.bottom = 0
      state.logsContainer.style.right = 0
      state.logsContainer.style.width = '50%'
      document.body.appendChild(state.logsContainer)

      state.rendererRequireContainer = document.createElement('div')
      state.rendererRequireContainer.style.color = '#eee'
      state.rendererRequireContainer.style.background = '#333'
      state.rendererRequireContainer.style.position = 'absolute'
      state.rendererRequireContainer.style.overflow = 'auto'
      state.rendererRequireContainer.style.top = 0
      state.rendererRequireContainer.style.bottom = 0
      state.rendererRequireContainer.style.left = 0
      state.rendererRequireContainer.style.width = '50%'

      let paths = Object.keys(require.cache).sort()
      let tree = require('path-list-to-tree').default(paths)
      console.log(tree)
      state.rendererRequireContainer.innerHTML =
        '<strong>' + paths.length + '</strong> modules in require.cache<pre>' + 
          tree[0].children.map(node=>require('./path-to-color')(node))
        + '<pre>'

      document.body.appendChild(state.rendererRequireContainer)

      Object.keys(state).forEach(key=>state.logsContainer.innerHTML+=`${key} :: ${state[key]}<br>`)
      const { ipcRenderer } = require('electron')
      ipcRenderer.on('main-event', (event, yaml)=>{
        state.logsContainer.innerHTML += `main :: ${yaml}<br>`
      })

    } catch (e) {
      console.error(e)
    }

    return state
  },

  Reload(__filename)

]
