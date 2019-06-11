function closeSuggestions(){
    this.remove();
    document.querySelector('omni-box').hide();
}

module.exports = class extends HTMLElement{
    constructor(){super()}
    connectedCallback(){
        this.addEventListener('click',closeSuggestions)
    }

    remove(){
        document.querySelectorAll('omni-box').forEach(e=>e.parentElement.removeChild(e));
    }    
}