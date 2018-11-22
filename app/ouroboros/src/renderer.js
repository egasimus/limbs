const Events = require('limbs-eventemitter')
    , File   = require('limbs-file')
    , Audit  = require('limbs-audit')
    , Reload = require('limbs-reload')

module.exports = [

  Events(),

  File({ cwd: __dirname }),

  Audit((state, event)=>{
    console.log(event)
    // state.logsContainer && (state.logsContainer.innerHTML += `renderer :: ${require('./yaml')(event)}<br>`)
  }),

  ...require('./ui-react'),

  // require('./ui-vanilla')

  Reload(__filename)

]
