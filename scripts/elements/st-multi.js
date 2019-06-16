module.exports = class extends HTMLElement { 
    constructor () { super(); }
    connectedCallback () {
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        document.querySelector('m-settings').classList.toggle("display");
        this.parentElement.hide();
        document.querySelectorAll('all-escape').forEach(e=>e.parentElement.removeChild(e));
    }
}