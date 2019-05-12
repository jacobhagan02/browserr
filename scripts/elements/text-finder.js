module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = '';
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('placeholder','Search Text');

        var exitBtn = document.createElement('button');
        var icns = require('../readIcons.js')
        exitBtn.innerHTML = new icns(window.settings.iconPack).read('close');

        this.appendChild(input);
        this.appendChild(exitBtn);
        exitBtn.addEventListener('click',this.exit);
        input.addEventListener('keydown',this.input);
    }

    exit(){
        // console.log('click')
        this.parentElement.style.display = 'none';
        getCurrentView().stopFindInPage('keepSelection');
    }

    input(event){
        // console.log(event)
        if(this.value == ''){
            getCurrentView().stopFindInPage('keepSelection');
        }else{
            if(event.key == 'Enter' || event.key =='ArrowRight' || event.key == 'ArrowLeft' || event.key == 'alt' || event.key == 'ArrowUp' || event.key == 'ArrowDown'){
                // event.preventDefault();

                getCurrentView().findInPage(this.value,{findNext:true});
            }else{
                getCurrentView().findInPage(this.value + this.key,{});
            }
        }
        
    }
}