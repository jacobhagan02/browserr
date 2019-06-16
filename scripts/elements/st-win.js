module.exports = class extends HTMLElement {    
    constructor(){
        super();
    }
    connectedCallback(){
        this.addEventListener('click',makeNewWin);
    }
}