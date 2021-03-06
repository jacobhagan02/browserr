const rmt = require('electron').remote;
const Menu = rmt.Menu;
//console.log(Menu);
Menu.setApplicationMenu(null);
const BrowserWindow = rmt.BrowserWindow;

window.makeWebv = function makeWebv(url = "https://google.com"){

    let vv = window.document.createElement("web--view");
    vv.setAttribute('num',tabs.children.length);
    vv.setAttribute('disablewebsecurity','');
    vv.setAttribute('webpreferences','allowRunningInsecureContent, javascript=yes');
    vv.setAttribute('src',url);
    vv.setAttribute('allowpopups','');

    window.document.querySelector('multi-view').addChild(vv);
}

function changeWindow(){
    Menu.setApplicationMenu(mnu);
}

rmt.getCurrentWindow().on('focus',changeWindow)

function closeTab(){
    //console.log(window.currentTab.tRemove)
    window.currentTab.tRemove();
}

function openDevTools(){
    getCurrentView().openDevTools();
}

function newTab(){
    makeWebv();
}

function newWindow(){
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        },
        icon: './images.png',
        frame: false,
        minWidth: '145',
        minHeight: '100'});

    win.loadFile(__dirname+'/index.html');
}

require('electron').remote.getCurrentWindow().on('resize', ()=>{
  if(window.outerHeight - window.innerHeight < 0){
    var diff = window.innerHeight - window.outerHeight
    document.querySelector('body').style.marginTop = diff + 'px';
    if(document.querySelector('ch-min')){
      diff /= 2;
      document.querySelector('ch-min').style.top = diff + 'px';
      document.querySelector('ch-max').style.top = diff + 'px';
      document.querySelector('ch-exit').style.top = diff + 'px';
    }
  }else{
    var diff = 0
    document.querySelector('body').style.marginTop = diff + 'px';
    if(document.querySelector('ch-min')){
      document.querySelector('ch-min').style.top = diff + 'px';
      document.querySelector('ch-max').style.top = diff + 'px';
      document.querySelector('ch-exit').style.top = diff + 'px';
    }
  }
});

let mnu = Menu.buildFromTemplate(
        [
        // { role: 'appMenu' }
        ...(process.platform === 'darwin' ? [{
          label: require('electron').remote.app.getName(),
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }] : []),
        // { role: 'fileMenu' }
        {
          label: 'File',
          submenu: [
            {label: 'Close Window', click:()=>{require('electron').remote.getCurrentWindow().close()}}
          ]
        },
        // { role: 'editMenu' }
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(process.platform==='darwin' ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [
                  { role: 'startspeaking' },
                  { role: 'stopspeaking' }
                ]
              }
            ] : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll' }
            ])
          ]
        },
        // { role: 'viewMenu' }
        {
          label: 'View',
          submenu: [
            // { role: 'reload' },
            // { role: 'forcereload' },
            // { role: 'toggledevtools' },
            // { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
          ]
        },
        // { role: 'windowMenu' }
        {
          label: 'Window',
          submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(process.platform==='darwin' ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ] : [
              { role: 'close' }
            ])
          ]
        },
    
    {label:'Current Tab', submenu: [
        {label:'Close Tab',accelerator : 'CmdOrCtrl+W',click:closeTab},
        {label:'Dev Tools',accelerator:'CmdOrCtrl+Shift+I',click:openDevTools},
        {label:'New Tab',accelerator:'CmdOrCtrl+T',click:newTab},
        {label:'New Window',accelerator:'CmdOrCtrl+N',click:newWindow},
        {label:'Find In Page',accelerator:'CmdOrCtrl+F',click:findTxt}
]}]);

Menu.setApplicationMenu(mnu);

function findTxt(){
    document.querySelector('text-finder').style.display = 'inline-block';
}