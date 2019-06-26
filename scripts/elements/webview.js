const History = require('../history.js').History;
const WebSearch = require('../websearch.js');
const os = require('os');
const path = require('path');
var nonPageItems = [document.querySelector('tabBar'), document.querySelector('toolbar'), document.querySelector('book-marks')];
var pageLog = [];

function packagePage(url,title){
    
    // Make this just a shortcut to the main app with command line args for the url
}

function attachRedirect(d,c){
    if(d.resourceType == 'mainFrame'){
        window.settings.h[window.settings.h.length - 1].pageLog = pageLog;
        console.log(window.settings.h)
        pageLog = [d.url];
    }else{
        pageLog.push(d.url);
    }

    require('../redirects.js')(d.url,c);
}

function handleReady(){
    // console.log(this.getWebContents())
    this.getWebContents().session.webRequest.onBeforeRequest(attachRedirect);
}

function handleWindowRequest(event){
    url = event.url;
    frameName = event.frameName;
    disposition = event.disposition; /* can be one of: default, foreground-tab, background-tab, new-window, save-to-disk, other. */
    options = event.options; /* like if you were to make a new browserWindow, its the exact same options as that */

    // for now just make a new tab, but later add functionality for stuff like background tabs and stuff.
    // downloads will be webview.downloadFile()
    // console.log(event)
    makeWebv(url);
}

function addToHistory(url,title){
    History.addItem({url:url,title:title,date:Date.now()});
}

function handleTargetUrl(event){

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

    this.parentElement.tab.querySelector('tb-title').innerHTML = 'loading...'
}

function handleStopLoad(e){
    window.document.querySelector('ind').display = 'none';

    this.parentElement.tab.querySelector('tb-title').innerHTML = this.getTitle();
}

function handleURLUpdate(event){

    document.querySelector('body > toolbar > search-bar > sch-ipt').innerHTML = new WebSearch(event.url).htmlify();
    // console.log(this.src)
    addToHistory(event.url,event.srcElement.getTitle());

    // console.log(event);
}

function handleFullScreen(event){
    nonPageItems.forEach(e=>{
        e.style.display = 'none';
    });
    this.style.position = 'absolute';
    this.style.height = '100vh';
    this.style.width = '100vw';
}

function handleNormalScreen(event){
    nonPageItems.forEach(e=>{
        e.style.display = '';
    });
    this.style.position = '';
    this.style.height = '';
    this.style.width = '';
}

module.exports = class wv extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        if(!this.hasAttribute("num")){
            throw new Error("A usable webview was declared but without a \"num\" attribute.");
        }else{
            var v = window.document.createElement("webview");
            var a = window.document.createAttribute("src");
            var ws = window.document.createAttribute("disablewebsecurity");
            var webp = window.document.createAttribute("webpreferences");
            var full = window.document.createAttribute("allowfullscreen");
            if(window.settings.homePage == undefined){
                require('../editUser.js').set('homePage','https://www.google.com');
                a.value = 'https://www.google.com';
            }else{
                a.value = window.settings.homePage;
            }
            webp.value = this.getAttribute('webpreferences');

            v.setAttributeNode(a);
            v.setAttributeNode(ws);
            v.setAttributeNode(webp);
            v.setAttributeNode(full);

            this.appendChild(v);
            let web = this.view;

            web.addEventListener('page-favicon-updated', this.otherFavicon);
            web.addEventListener('page-title-updated', this.updateTabTitle);
            web.addEventListener('new-window', handleWindowRequest);
            web.addEventListener('update-target-url', handleTargetUrl);
            web.addEventListener('did-navigate', handleURLUpdate);
            web.addEventListener('did-start-loading', handleStartLoad);
            web.addEventListener('did-stop-loading',handleStopLoad);
            web.addEventListener('enter-html-full-screen', handleFullScreen);
            web.addEventListener('leave-html-full-screen', handleNormalScreen);
            web.addEventListener('dom-ready',handleReady);
            web.setAttribute('preload',`file://${__dirname}/../webviewPreload.js`);
           

            var toptab = window.document.createElement("pg-tab");
            toptab.num = tabs.children.length;

            tabs.appendChild(toptab);

        }
    }


    hide(){
        this.style.display = 'none';
    }

    show(){
        this.style.display = 'inline';
    }

    get view(){
        return this.children[0];
    }

    set src(s){
        this.view.src = s;
        this.setAttribute('src',s);
    }

    get tab(){
        return window.document.querySelector('page-tabs').children[this.getAttribute("num")];
    }

    set tab(n){
        this.setAttribute("num",n);
    }

    get session(){
        this.view.getWebContents().session;
    }

    remove(){
        this.parentElement.removeChild(this);
    }

    assets(){
        return pageLog;
    }

    searchBarUpdate(){
        var url = this.src;

        var mySearch = new WebSearch(url);

        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = mySearch.htmlify()
    }

    updateTabTitle(title,explicitSet){
        var tab = this.parentElement.tab;

        // console.log('tab = ' + title)
        tab.querySelector('tb-title').innerHTML = title.title;
    }

    otherFavicon(favs){
        var tab = this.parentElement.tab;

        tab.querySelector('tb-icon').querySelector('img').src = favs.favicons[0];
    }

    pkgSite(){
        packagePage(this.view.src,this.view.getTitle());
    }
}
