module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        var url = getCurrentView().src;


        this.innerHTML = '<span>' + url + '</span>' + '<button id="copy"></button> <button id="edit"></button>';

        this.querySelector('#copy').innerHTML = 'Copy';
        this.querySelector('#copy').addEventListener('click',()=>{
            require('electron').remote.clipboard.writeText(url);
        });

        this.querySelector('#edit').innerHTML = 'Remove';
        this.querySelector('#edit').addEventListener('click',()=>{
            // box.hide();
            // console.log('here')
            
            // console.log(document.querySelector('search-bar'))
            document.querySelector('search-bar').focuss();
            document.querySelector('sch-ipt').html = '';
        });
    }
}