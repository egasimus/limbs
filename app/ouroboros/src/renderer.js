const Events = require('limbs-eventemitter')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-reload')

module.exports = [

  Events(({ Events })=>{
    Events.offAll()
  }),

  File({ cwd: __dirname }),

  Audit((state, event)=>{
    console.log(event)
    // state.logsContainer && (state.logsContainer.innerHTML += `renderer :: ${require('./yaml')(event)}<br>`)
  }),

  ...require('./react'),

  // require('./ui-vanilla')

  Reload(__filename)

]
