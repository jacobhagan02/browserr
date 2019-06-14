// Modules to control application life and create native browser window
const {ipcMain, app, BrowserWindow, session, Tray, Menu, MenuItem, Accelerator, Notification, shell, nativeImage} = require('electron');
const { autoUpdater } = require("electron-updater");
require('electron').app.isPackaged = true
autoUpdater.checkForUpdatesAndNotify()
// const JSON5 = require('json5');

// console.log(require('electron').app)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray = null;
let branch = 'nightly';
let debugging = false;
let offline = false;
let redirs = require('./scripts/redirects.js')

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './svgs/images.png',
    frame: false,
    backgroundColor: '#ffffff',
    minWidth: 200,
    minHeight: 100
  });

  // and load the password.html of the app.
  mainWindow.loadFile('password.html');

  // Open the DevTools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed',()=>{
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
    ucycle = null;
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let user = JSON.parse('{"name":"default","ZoomLevel":1,"ZoomIncrement":0.05,"font-weight":"400","iconPack":"google","history":true,"bookmarks":true,"branch":"nightly","h":[],"b":{},"pass":""}');
ipcMain.on('set-user',(event,value)=>{
    user = value;
});

ipcMain.on('get-user',(event,value)=>{
    event.returnValue = user;
});
