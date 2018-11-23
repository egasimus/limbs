const Events = require('limbs-events')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-run/reload')
    , Run    = require('limbs-run')

module.exports = [

  Events(state=>{
    state.Events.offAll()
  }),

  File({ cwd: __dirname }),

  Audit((state, event)=>{
    if (event[0] === 'Error') {
      console.error(event.slice(1))
    } else {
      console.debug(event)
    }
    // state.logsContainer && (state.logsContainer.innerHTML += `renderer :: ${require('./yaml')(event)}<br>`)
  }),

  Run('./redux', require),

  Run('./react', require),

  Reload(__filename)

]
