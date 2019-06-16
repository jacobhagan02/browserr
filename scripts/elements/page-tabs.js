require('electron').remote.getCurrentWindow().on('maximize',()=>{
    document.querySelector('page-tabs').style.paddingLeft = '';
});

require('electron').remote.getCurrentWindow().on('unmaximize',()=>{
    document.querySelector('page-tabs').style.paddingLeft = '70px'
});

module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        if(process.platform === 'darwin'){
            this.style.paddingLeft = '70px';
        }
    }
}