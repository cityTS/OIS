const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getLogs: (callback) => ipcRenderer.on('update-log', callback)
})
