const Events = require('../events')
    , Audit  = require('../events/audit')
    , Run    = require('../run/run')
    , ReRun  = require('../run/rerun')

module.exports = [

  Audit(
    (current, event)=>{
      if (event[0] === 'Error') {
        console.error(...event.slice(1))
      } else {
        console.debug(event) } }),

  ReRun(
    './redux', require),

  Run(current=>{

    const { ipcRenderer } = require('electron')
    if (current.IPC) ipcRenderer.removeListener('main-event', current.IPC)
    ipcRenderer.on('main-event', current.IPC =
      (event, args) => current.Events.emit(...args))
  
    current.Redux.store.dispatch({ type: 'AddDeps', args: { name: 'frontend', tree: current.Deps } }) }),

  ReRun(
    './react', require),

]
