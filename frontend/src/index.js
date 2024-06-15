const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
}

app.on("ready", createWindow);

ipcMain.handle("process-pdf", async (event, filePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
  try {
    const response = await axios.post(
      "http://localhost:3000/process-excel",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    dialog.showErrorBox("Error", "Failed to process the PDF file.");
    return null;
  }
});
