// const settings = window.settings;
// const readIcons = require('../readIcons.js');
// const IconSet = new readIcons(settings.iconPack);
const thisWindow = require('electron').remote.getCurrentWindow();

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
        // this.innerHTML = require('../icons.js').winmax
    }else{
        thisWindow.maximize();
        // this.innerHTML = require('../icons.js').winmax2
    }
}

require('electron').remote.getCurrentWindow().on('maximize',()=>{
    console.log('max')
    document.querySelector('ch-max').setMaxBtn(2);
});

require('electron').remote.getCurrentWindow().on('unmaximize',()=>{
    console.log('min')
    document.querySelector('ch-max').setMaxBtn(1);
});

module.exports = class extends HTMLElement {
    constructor(){
        super();
            // let shadowRoot = this.attachShadow({mode:'open'});
            this.innerHTML = require('../icons.js').winmax

            this.addEventListener('click',maximize);
    }

    connectedCallback(){
        if(process.platform === 'darwin'){
            this.style.display = 'none'
        }
    }

    setMaxBtn(num){
        console.log(num)
        var icn = (num===2) ? "2" : "";
        var file = require('../icons.js')['winmax' + icn]
        console.log(file)
        document.querySelectorAll('ch-max').forEach((element,key,parent)=>element.innerHTML = file);
    }
}
