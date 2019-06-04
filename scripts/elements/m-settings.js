module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = "Multi View <button></button><br><input id='cols' type='number' value='1' style='border-top-right-radius:0;border-bottom-right-radius:0;border-right:0;display:inline-block;width:50%;' /><input id='rows' type='number' value='1' style='width:50%;display:inline-block;border-top-left-radius:0;border-bottom-left-radius:0;' />";
        var btn = this.querySelector('button');
        btn.addEventListener('click',this.exit);
        var icns = require('../readIcons.js');
        btn.innerHTML = new icns(window.settings.iconPack).read('close');
       
        this.querySelector('#cols').addEventListener('input',this.keyEvent1);
        this.querySelector('#rows').addEventListener('input',this.keyEvent2);
    }

    exit(){
        // console.log('click')
        this.parentElement.classList.toggle("display");
    }

    keyEvent1(){
        document.querySelector('multi-view').changeCols(this.value);
    }

    keyEvent2(){
        document.querySelector('multi-view').changeRows(this.value);
    }
}
