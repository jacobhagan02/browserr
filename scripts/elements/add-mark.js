const io = require('../bookmarks.js');

function queryTitle(){
    return new Promise((resolve,reject)=>{
        var e = document.createElement('full-query');
        e.setAttribute('msg','Please enter a title for your bookmark');
        e.setAttribute('title','Title');
        document.querySelector('body').appendChild(e);

        e.querySelector('input').addEventListener('keydown',(k)=>{
            if(k.key == 'enter'){
                resolve(e.querySelector('input').value);
            }
        });

        e.querySelector('done').addEventListener('click',()=>{
            resolve(e.querySelector('input').value);
        });

    });
}

function refreshBookmarks(){
    document.querySelector('book-marks').connectedCallback();
}


module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        var icon = window.document.querySelector('web--view:not([style="display: none;"])').tab.querySelector('tb-icon img').src;
        var url = window.document.querySelector('web--view:not([style="display: none;"])').view.src;
        queryTitle().then((title)=>{
            var t = title;
            var obj = {
                href:url,
                title:t,
                icon:icon
            }

            io.set(t,obj);
            refreshBookmarks();
        }).catch(e=>{
            throw new Error(e);
        });
    }
}