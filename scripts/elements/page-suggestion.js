module.exports = class extends HTMLElement{
    constructor(){super()}
    connectedCallback(){
        var url = this.innerText;
        this.addEventListener('click',()=>{
            document.querySelector('omni-box').hide();
            getCurrentView().src = url; 

            if(this.parentElement.inputEntered == 0){
            for(let i of this.parentElement.inputEntered){
                i(url, "currentTab");
            }}
            if(document.querySelector('all-escape')){document.querySelector('all-escape').remove()}
        });
    }


    // ADD DELETE BUTTON AND OMNIBOX EXTENSION DELETED EVENT
}