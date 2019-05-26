function findTxt(){
    document.querySelector('text-finder').style.display = 'inline-block';
}

function zin(){
    getCurrentView().getZoomFactor(factor=>{
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

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',this.settingsMenu);
    }

    settingsMenu(e){
        console.log(e);
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
                {label:"Zoom In",click:zin},
                {label:"Zoom Out",click:zout},
                {label: "Reset",click:zReset}
            ]},
            {type:"separator"},
            {label:"Settings",click:settingsWindow},
            {label:"Dev Tools",click:openTools},
            {label: "Multi View"}
        ]);

        mnu.popup({y:e.target.offsetTop+25,x:e.target.offsetLeft})
    }
}