module.exports = class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){
        let boxSize = 23;

        this.innerHTML = `<img src="${this.getAttribute('href')}" style="position:relative;top:7.5px;" width=${boxSize} height=${boxSize} />`
    }
}