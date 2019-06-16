const {ipcMain, app, BrowserWindow, session, Tray, Menu, MenuItem, Accelerator, Notification, shell, nativeImage} = require('electron');
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify()

let mainWindow;
let tray = null;
let branch = 'nightly';
let debugging = false;
let offline = false;
let redirs = require('./scripts/redirects.js')

function createWindow () {
  let hasFrame = false //process.platform ==='darwin';

  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './svgs/images.png',
    frame: hasFrame,
    titleBarStyle : 'hidden',
    backgroundColor: '#ffffff',
    minWidth: 200,
    minHeight: 100
  });
  mainWindow.loadFile('password.html');
  mainWindow.openDevTools();
  mainWindow.on('closed',()=>mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', ()=>{ if (process.platform !== 'darwin') app.quit(); });
app.on('activate', ()=> { if (mainWindow === null) createWindow() });

let user = JSON.parse('{"name":"default","ZoomLevel":1,"ZoomIncrement":0.05,"font-weight":"400","iconPack":"google","history":true,"bookmarks":true,"branch":"nightly","h":[],"b":{},"pass":""}');

ipcMain.on('set-user',(event,value)=>{
    user = value;
});

ipcMain.on('get-user',(event,value)=>{
    event.returnValue = user;
});

autoUpdater.on('update-downloaded', (info)=>{
  console.log(info);
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: info.releaseNotes,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  });
});