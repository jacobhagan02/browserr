function focusSearchInput(){
    window.document.body.querySelector('search-bar').querySelector('sch-ipt').focus();
}


module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.addEventListener('click', focusSearchInput)
        this.addEventListener('click',()=>{
            document.querySelector('omni-box').show();
        });
    }

    focus(){
        focusSearchInput()
    }
}