// const settings = window.settings;
// const readIcons = require('../readIcons.js');
// const IconSet = new readIcons(settings.iconPack);
const thisWindow = require('electron').remote.getCurrentWindow();

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
    }else{
        thisWindow.maximize();
    }
}

module.exports = class extends HTMLElement {
    constructor(){
        super();
            // let shadowRoot = this.attachShadow({mode:'open'});
            this.innerHTML = require('../icons.js').winmax

            this.addEventListener('click',maximize);
    }
}
