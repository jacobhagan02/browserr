// const settings = window.settings;
// const readIcons = require('../readIcons.js');
// const IconSet = new readIcons(settings.iconPack);
const thisWindow = require('electron').remote.getCurrentWindow();

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
        this.innerHTML = require('../icons.js').winmax
    }else{
        thisWindow.maximize();
        this.innerHTML = require('../icons.js').winmax2
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
