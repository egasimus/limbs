module.exports = function ElectronIPC (current = {}) {

  const { ipcMain, ipcRenderer } = require('electron')

  // console.log(123123123,ipcMain, ipcRenderer)

  const IPC = current.IPC = current.IPC || {}

  if (ipcMain) {
    ipcMain.on('frontend-event', (event, arg)=>{
      console.log('frontend event', arg)
      event.sender.send('backend-event', '[BackendReady]')
    })
  }

  if (ipcRenderer) {
    ipcRenderer.on('backend-event', (event, arg)=>{
      console.log('backend event', arg)
    })
    ipcRenderer.send('frontend-event', '[FrontendReady]')
  }

  return current

}
