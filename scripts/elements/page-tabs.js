require('electron').remote.getCurrentWindow().on('enter-full-screen',()=>{
    if(process.platform === 'darwin')
        document.querySelector('page-tabs').style.paddingLeft = '';
});

require('electron').remote.getCurrentWindow().on('leave-full-screen',()=>{
    if(process.platform === 'darwin')
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