const WebSearch = require('../websearch.js');

function handleTooBig(){
    tabs.setAttribute('style','top: -7px;');
}

function handleTooSmall(){
    tabs.setAttribute('style','')
}

function handlePin(){

}

function newWinBig(openurl){
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
    win.webContents.executeJavaScript('getCurrentView().src = "'+openurl+'";');

}


module.exports = class extends HTMLElement {
    constructor(){
        super();


    }

    connectedCallback(){
        this.innerHTML = "<tb-icon src='images.png'></tb-icon><tb-title>New Tab</tb-title><tb-remove></tb-remove><tab-info></tab-info>";
        this.addEventListener("click",this.show);
        this.addEventListener("click",this.searchBarUpdate2);
        this.addEventListener('contextmenu',this.contextMenu);
        this.addEventListener('mouseover', this.hover);
        this.addEventListener('mouseleave', this.leave);

        this.view = document.querySelector('web--view[num="'+this.num+'"]');

        this.show();



        if(tabs.offsetTop > 27){
            handleTooBig();
        }
    }

    hover(){
        this.querySelector('tab-info').show();
    }

    leave(){

    }

    contextMenu(){
        var remote = require('electron').remote;
        var Menu = remote.require('electron').Menu;

        // console.log(this)
        var ele = this;
        function handlePin(){
            ele.togglePin();
        };

        function handleAssets(){
            var BrowserWindow  = remote.BrowserWindow;

            var assWin = new BrowserWindow({
                width: 300,
                height: 400,
                webPreferences: {
                  nodeIntegration: true
                },
                //icon: './svgs/images.png',
                frame: false,
                backgroundColor: '#ffffff',
                minWidth: 200,
                minHeight: 100
            });

            assWin.loadFile(__dirname+'/../../assetPage.html');
            assWin.openDevTools();

            var arg = "['" + ele.view.assets().join("','").toString() + "']";
            // console.log(arg);   

            assWin.webContents.executeJavaScript('addAssets(' + arg + ')',function(){console.log(arguments)});
        }

        var mnu = Menu.buildFromTemplate([
            { label : 'Pin' , click: handlePin },
            { label : 'Page Assets' , click: handleAssets }
        ]);

        mnu.popup();
    }

    pin(){
        this.setAttribute('unclosable','true');
    }

    unpin(){
        this.setAttribute('unclosable','false');
    }

    showAssets(){

    }

    togglePin(){
        // console.log(arguments);
        if(this.getAttribute('unclosable')=='true'){
            this.unpin();
        }
        else{
            this.pin();
        }
    }

    searchBarUpdate(){
        var url = this.view.view.src;

        url = url.substring(0,url.indexOf('/',8));
        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = url;
    }

    searchBarUpdate2(){
        var url = this.view.view.src;

        var mySearch = new WebSearch(url);

        window.document.querySelector('search-bar').querySelector('sch-ipt').innerHTML = mySearch.htmlify()
    }

    show(){
        let i;
        for(i = 0; i < tabs.children.length; i++){
            tabs.children[i].hide();
        }

        this.view.show();
        this.setAttribute('show','');
        currentTab = this;

        this.setAttribute('class','tabSelect');
    }

    hide(){
        if(!document.querySelector('multi-view').hasAttribute('enabled')){
            this.view.hide();
        }
        this.removeAttribute('show');
        this.setAttribute('class','');
    }

    get num(){
        return this.getAttribute("num");
    }

    set num(n){
        this.setAttribute("num",n);
    }

    remove(){

        if(this.parentElement.getAttribute('unclosable')!='true'){
            this.parentElement.view.remove();
            tabs.removeChild(this.parentElement);
    
            if(tabs.children.length == 0){
                require('electron').remote.getCurrentWindow().close();
            } else{
                tabs.children[0].show();
                if(tabs.offsetTop < 17){
                    handleTooSmall();
                }
            }
            if(document.querySelector('all-escape')){document.querySelector('all-escape').remove()}
            document.querySelector('multi-view').refresh();
        }
    }

    tRemove(){
        if(this.getAttribute('unclosabe')!='true'){
            this.view.remove();
            tabs.removeChild(this);
    
            if(tabs.children.length == 0){
                require('electron').remote.getCurrentWindow().close();
            } else{
                tabs.children[0].show();
                if(tabs.offsetTop < 23){
                    handleTooSmall();
                }
            }
            if(document.querySelector('all-escape')){document.querySelector('all-escape').remove()}
            document.querySelector('multi-view').refresh();
        }

    }
}
