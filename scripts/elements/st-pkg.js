module.exports=class extends HTMLElement{
    constructor(){
        super();
        // nothing
    }

    connectedCallback(){
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        getCurrentView().parentElement.pkgSite();
    }
}