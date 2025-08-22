const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  MenuItem,
} = require("electron/main");
const { autoUpdater } = require("electron-updater");

const path = require("path");

let mainWindow;

function createWindow() {
  console.log("Creating main window...");
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // optional
    },
  });

  if (process.env.ELECTRON_START_URL) {
    // Dev: Load Vite dev server
    console.log("Loading dev server:", process.env.ELECTRON_START_URL);
    mainWindow
      .loadURL(process.env.ELECTRON_START_URL)
      .catch((err) => console.error("Failed to load dev server:", err));
  } else {
    // Prod: Load Vite build
    const prodPath = path.join(__dirname, "dist/index.html");
    console.log("Loading production file:", prodPath);
    mainWindow
      .loadFile(prodPath)
      .catch((err) => console.error("Failed to load prod file:", err));
  }

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Window finished loading");
  });
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      console.error(
        "Window failed to load:",
        errorCode,
        errorDescription,
        validatedURL
      );
    }
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("show-notification", (event, payload) => {
  const { title, body, icon, badge } = payload;

  const notification = new Notification({
    title,
    body,
    icon,
    badge,
  });

  notification.show();
});

autoUpdater.checkForUpdatesAndNotify();
