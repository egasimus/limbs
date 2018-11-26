module.exports = function ElectronIPC (current = {}) {

  const { ipcMain, ipcRenderer } = require('electron')

  // console.log(123123123,ipcMain, ipcRenderer)

  const IPC = current.IPC = current.IPC || {}

  if (ipcMain) {
    require('./patch')(ipcMain)
    ipcMain.onAny((...args)=>console.log('ipcMain.onAny', args))
    require('./on-ready')(()=>{
      console.log('Electron ready') }) }

  // if (ipcRenderer) {
    // require('./patch')(ipcRenderer)
    // ipcRenderer.onAny((...args)=>console.log('ipcRenderer.onAny', args))
  // }

  return current

}
