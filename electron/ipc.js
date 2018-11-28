module.exports = function ElectronIPC (current = {}) {

  const { ipcMain, ipcRenderer } = require('electron')

  // console.log(123123123,ipcMain, ipcRenderer)

  const IPC = current.IPC = current.IPC || {}

  if (ipcMain) {
    if (IPC.unbindMain) IPC.unbindMain()
    const callback = (event, arg)=>{
      console.log('frontend event', arg)
      event.sender.send('backend-event', '[BackendReady]') }
    ipcMain.on('frontend-event', callback)
    IPC.unbindMain = () => ipcMain.off('frontend-event', callback)
  }

  if (ipcRenderer) {
    if (IPC.unbindRenderer) IPC.unbindRenderer()
    const callback = (event, arg)=>{ console.log('backend event', arg) }
    ipcRenderer.on('backend-event', callback)
    ipcRenderer.send('frontend-event', '[FrontendReady]')
    IPC.unbindRenderer = () => ipcRenderer.off('backendevent', callback)
  }

  return current

}
