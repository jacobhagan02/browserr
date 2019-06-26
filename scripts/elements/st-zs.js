module.exports = class extends HTMLElement { 
    constructor () { super(); }
    connectedCallback () {
        this.innerHTML = '<z-in></z-in><z-out></z-out><z-full></z-full>'
    }
}