function findTxt(){
    document.querySelector('text-finder').style.display = 'inline-block';
}

function zin(){
    getCurrentView().getZoomFactor(factor=>{
        console.log(zoomFactorChange)
        getCurrentView().setZoomFactor(factor + zoomFactorChange);
    });
}

function zout(){
    getCurrentView().getZoomFactor(factor=>{
        getCurrentView().setZoomFactor(factor - zoomFactorChange);
    });
}

function zReset(){
    getCurrentView().setZoomFactor(1);
}

function openMultiView(){
    document.querySelector('m-settings').classList.toggle("display");
}

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        // this.addEventListener('click',this.settingsMenu);
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(e){
        if(!e.path.includes(document.querySelector('other-settings')))
            this.querySelector('other-settings').classList.toggle('display')
    }

    settingsMenu(e){
        // console.log(e);
        var Menu = require('electron').remote.Menu;

        var mnu = Menu.buildFromTemplate([
            {label:"New Tab",click:makeWebv},
            {label:"New Window",click:makeNewWin},
            {type:"separator"},
            {label:"Find in Page",click:findTxt},
            {type:"separator"},
            {label:"History",click:historyWindow},
            {label:"Bookmarks",click:bookmarksWindow},
            {type:"separator"},
            {label: "Zoom",submenu:[
                {role : 'zoomin'},
                {role: 'zoomout'},
                {role: 'resetzoom'}
            ]},
            {type:"separator"},
            {label:"Settings",click:settingsWindow},
            {label:"Dev Tools",click:openTools},
            {label: "Multi View", click: openMultiView}
        ]);

        // console.log(e);
        mnu.popup({y:e.target.offsetTop+25,x:e.target.offsetLeft})
    }
}