// const settings = window.settings;
// const readIcons = require('../readIcons.js');
// const IconSet = new readIcons(settings.iconPack);
const thisWindow = require('electron').remote.getCurrentWindow();


module.exports = class extends HTMLElement {    
    constructor(){
        super();

            // let shadowRoot = this.attachShadow({mode:'open'});
            this.innerHTML = require('../icons.js').winx

            this.addEventListener('click',close);
    } 

    connectedCallback(){
        if(process.platform === 'darwin'){
            this.style.display = 'none'
        }
    }
}