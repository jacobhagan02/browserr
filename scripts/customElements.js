/**
 * 
 * @param {string} name both the name of the customElement that will be avalible in the html, and the directory to read the file from 
 */
function def(name){
    customElements.define(name, require('./elements/'+name+'.js'));
}

/**
 * Function to turn any text into a url
 * @param {string} text the raw text of the url to parse 
 * @param {function} callback a callback function that will call with the new url
 */
window.urlify = function urlify(text,callback){
    var es = require('url-exists');

    es("https://" + text, (err,bool)=>{
        if(bool){
            callback("https://"+text);
        }else{
            es("http://" + text, (err,bool)=>{
                if(bool){
                    callback("http://" + text);
                }else{
                    callback("https://" + window.searchProvider + "/search?q=" + text.replace(/ /g, '+'));
                }
            });
        }
    });
}

/**
 * Function that creates the new webview and a tab to go with it
 * @param {string} url The url that the webview will be loaded with. By default is google
 */
window.makeWebv = function makeWebv(url = window.settings.homePage){

    let vv = window.document.createElement("web--view");
    vv.setAttribute('num',tabs.children.length);
    vv.setAttribute('disablewebsecurity','');
    vv.setAttribute('webpreferences','allowRunningInsecureContent, javascript=yes');
    vv.setAttribute('src',url);
    vv.setAttribute('allowpopups','');

    window.document.querySelector('multi-view').addChild(vv);
}

window.searchProvider = window.settings.searchProvider;
if(window.searchProvider == undefined){
    window.searchProvider = 'www.google.com';
}
window.tabs = window.document.querySelector('page-tabs');



/**
 * 
 * @param {string} url The specific url that was accessed
 * @param {string} title The title of the page
 */
function addToHistory(url,title){
    History.addItem({url:url,title:title,date:Date.now()});
}


window.makeNewWin = function makeNewWin(){
    var BrowserWindow = require('electron').remote.BrowserWindow;
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        },
        icon: './images.png',
        frame: false,
        minWidth: '145',
        minHeight: '100'
    });

    win.loadFile(__dirname+'/../index.html');
}

window.settingsWindow = function settingsWindow(){
    var BrowserWindow = require('electron').remote.BrowserWindow;
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        },
        icon: './images.png',
        frame: false,
        minWidth: '145',
        minHeight: '100'
    });

    win.loadFile(__dirname+'/../settings.html');
    // win.openDevTools();
}

window.bookmarksWindow = function bookmarksWindow(){
    window.open('bookmarkspage.html')
}

window.historyWindow = function historyWindow(){
    var BrowserWindow = require('electron').remote.BrowserWindow;
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: './images.png',
        frame: false,
        minWidth: '145',
        minHeight: '100'
    });

    win.loadFile(__dirname+'/../historypage.html');
    // win.openDevTools();
}

function changeChrome(r,g,b){
    document.querySelector('chrome').style.background = `rgb(${r},${g},${b})`;
}

function handleWindowRequest(event){
    url = event.url;
    frameName = event.frameName;
    disposition = event.disposition; /* can be one of: default, foreground-tab, background-tab, new-window, save-to-disk, other. */
    options = event.options; /* like if you were to make a new browserWindow, its the exact same options as that */

    // for now just make a new tab, but later add functionality for stuff like background tabs and stuff.
    // downloads will be webview.downloadFile()
    //console.log(url);
    makeWebv(url);
}

function handleTargetUrl(event){
    //console.log(event);

    if(event.url == ""){
        window.document.querySelector('ind').style.display = 'none';
        mouseLinkHover = null;
    } else{
        var a = window.document.querySelector('ind');
        a.style.display = 'inline-block';
        a.innerHTML = event.url;
        mouseLinkHover = event.url;
    }
}

function handleStartLoad(e){
    window.document.querySelector('ind').display = 'inline-block';
    window.document.querySelector('ind').innerHTML = 'loading...';
}

function handleStopLoad(e){
    window.document.querySelector('ind').display = 'none';
}

function handleURLUpdate(event){
    addToHistory(event.url,event.srcElement.getTitle());
}

window.getCurrentView = function getCurrentView(){
    return window.document.querySelector('web--view:not([style="display: none;"])').view;
}

window.openTools = function openTools(){
    getCurrentView().openDevTools();
}

function minimize(){
    require('electron').remote.getCurrentWindow().minimize();
}

function close(){
    require('electron').remote.getCurrentWindow().close()
}

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
    }else{
        thisWindow.maximize();
    }
}


function pgBack(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goBack();
}

function pgForward(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goForward();
}

function pgRefresh(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.reloadIgnoringCache();
}

function focusSearchInput(){
    window.document.body.querySelector('search-bar').querySelector('sch-ipt').focus();
}

const settings = window.settings;
require('./docload.js');
var svgs = require('./icons.js');
const zoomFactorChange = settings.ZoomIncrement;
const useHistory = settings.History;
const History = (useHistory) ? require('./history.js').History : undefined;
const thisWindow = require('electron').remote.getCurrentWindow();
const readIcons = require('./readIcons.js');
const IconSet = new readIcons(settings.iconPack);
window.indicator = window.document.querySelector('ind');

customElements.define('web--view', require('./elements/webview.js'));
def('add-tab');
def('ch-min');
def('ch-max');
def('ch-exit');
def('page-tabs');
def('pg-tab');
def('tb-remove');
def('tb-icon');
def('tb-title');
def('pg-back');
def('pg-forward');
def('pg-refresh');
def('settings-ico');
def('search-bar');
def('sch-ipt');
def('sch-icon');
def('other-settings');
def('st-win');
def('st-btn');
def('st-br');
def('st-history');
def('st-bookmarks');
def('page-zoom');
def('z-in');
def('z-out');
def('z-full');
def('book-marks');
def('b-mark');
def('b-ico');
def('b-title');
def('dev-tools');
def('adv-settings');
def('hist-menu');
def('hist-open');
def('hist-remove');
def('add-mark');
def('full-query');
def('multi-view');
def('m-settings');
