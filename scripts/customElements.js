/**
 * Function to define a new customElement based on the module
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
 * Add the specified page to the users history
 * @param {string} url The specific url that was accessed
 * @param {string} title The title of the page
 */
function addToHistory(url,title){
    History.addItem({url:url,title:title,date:Date.now()});
}

/**
 * Creates a new window
 */
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

/**
 * Opens up the settings page so the user can edit their settings
 */
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

/**
 * Opens the bookmarks page so the user can view and edit their bookmarks
 */
window.bookmarksWindow = function bookmarksWindow(){
    window.open('bookmarkspage.html')
}

/**
 * Opens up the historyWindow so the user can view all the pages they have visited
 */
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

/**
 * Sets the background color of the windows chrome - Mostly useless but will stay here because it might be useful at some point
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
function changeChrome(r,g,b){
    document.querySelector('chrome').style.background = `rgb(${r},${g},${b})`;
}

/**
 * The handler for when the user hovers over a link
 * @param {Event} event 
 */
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

/**
 * Displays that the page has begun to load
 * @param {event} e 
 */
function handleStartLoad(e){
    window.document.querySelector('ind').display = 'inline-block';
    window.document.querySelector('ind').innerHTML = 'loading...';
}

/**
 * Removes the "loading..." text from the indicator
 * @param {event} e 
 */
function handleStopLoad(e){
    window.document.querySelector('ind').display = 'none';
}

/**
 * Handler for when the URL is updated
 * @param {event} event 
 */
function handleURLUpdate(event){
    addToHistory(event.url,event.srcElement.getTitle());
}

/**
 * Returns the current view based on the first one that is not hidden
 */
window.getCurrentView = function getCurrentView(){
    return window.document.querySelector('web--view:not([style="display: none;"])').view;
}

/**
 * Opens developer tools for the current web page
 */
window.openTools = function openTools(){
    getCurrentView().openDevTools();
}

/**
 * Minimizes the window
 */
function minimize(){
    require('electron').remote.getCurrentWindow().minimize();
}

/**
 * Closes the window
 */
function close(){
    require('electron').remote.getCurrentWindow().close()
}

/**
 * Maximizes the window
 */
function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
    }else{
        thisWindow.maximize();
    }
}

/**
 * Navigates back
 */
function pgBack(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goBack();
}

/**
 * Navigates forward
 */
function pgForward(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goForward();
}

/**
 * Refreshes the current page
 */
function pgRefresh(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.reloadIgnoringCache();
}

/**
 * puts the user input in the search input
 */
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
