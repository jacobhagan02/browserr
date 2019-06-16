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