const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  processPdf: (filePath) => ipcRenderer.invoke("process-pdf", filePath),
});
