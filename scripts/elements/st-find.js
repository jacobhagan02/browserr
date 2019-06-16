module.exports = class extends HTMLElement { 
    constructor () { super(); }
    connectedCallback () {
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        document.querySelector('text-finder').style.display = 'inline-block';
    }
}