module.exports = class extends HTMLElement{
    constructor(){super()}
    connectedCallback(){
        var url = this.innerHTML;
        this.addEventListener('click',()=>{
            document.querySelector('omni-box').hide();
            getCurrentView().src = url; 
            if(document.querySelector('all-escape')){document.querySelector('all-escape').remove()}
        });
    }
}