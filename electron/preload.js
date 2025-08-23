const { contextBridge, ipcRenderer } = require("electron");

// Expose safe APIs to renderer
contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  showNotification: (payload) => ipcRenderer.send("show-notification", payload),
});

// Expose environment variables to renderer
contextBridge.exposeInMainWorld("process", {
  env: {
    BUILD_TARGET: "electron"
  }
});
