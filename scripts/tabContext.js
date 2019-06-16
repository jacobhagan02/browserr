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
            process.platform==='darwin' ? { role: 'close' } : { role: 'quit' }
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
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
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
        {label:'Close Tab',accelerator : 'Ctrl+W',click:closeTab},
        {label:'Dev Tools',accelerator:'Ctrl+Shift+I',click:openDevTools},
        {label:'New Tab',accelerator:'Ctrl+T',click:newTab},
        {label:'New Window',accelerator:'Ctrl+N',click:newWindow},
        {label:'Find In Page',accelerator:'Ctrl+F',click:findTxt}
]}]);

Menu.setApplicationMenu(mnu);

function findTxt(){
    document.querySelector('text-finder').style.display = 'inline-block';
}