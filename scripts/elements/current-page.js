module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        var box = document.querySelector('omni-box');
        var url = getCurrentView().src;
        document.querySelector('sch-ipt').innerHTML = ''

        this.innerHTML = '<span>' + url + '</span>' + '<button id="copy"></button> <button id="edit"></button>';

        this.querySelector('#copy').innerHTML = 'Copy';
        this.querySelector('#copy').addEventListener('click',()=>{
            require('electron').remote.clipboard.writeText(url);
        });

        this.querySelector('#edit').innerHTML = 'Edit';
        this.querySelector('#edit').addEventListener('click',()=>{
            box.hide();
            document.querySelector('sch-ipt').innerHTML = url;
            document.querySelector('search-bar').focus();
        });
    }
}