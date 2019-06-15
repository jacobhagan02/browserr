function focusSearchInput(){
    window.document.body.querySelector('search-bar').querySelector('sch-ipt').focus();
    var range = document.createRange();
    range.selectNode(document.body.querySelector('search-bar').querySelector('sch-ipt'))
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
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

    focuss(){
        // console.log('heres')
        focusSearchInput()
    }
}