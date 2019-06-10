function suggest(text){

    var og = text;
    text = text.replace(/\?/g,'\\?').replace('https://','').split('').join('?').replace(/\./g,'\\.');
    var arr = [
        'https://google.com',
        'https://www.google.com',
        'https://bing.com',
        'https://youtube.com',
        'https://apple.com'
    ]
    var suggestArr = [];
    var low = [];
    var med = [];
    var high = [];
    var regex = new RegExp(text,'g');

    var suggests = []
    for(let i = 0; i < window.settings.suggestedURLS.length; i++){
        if(!window.settings.suggestedURLS[i].url){
            var url = window.settings.suggestedURLS[i];
            window.settings.suggestedURLS[i] = {};
            window.settings.suggestedURLS[i].url = url;
            require('get-website-favicon')(url).then(d=>{
                window.settings.suggestedURLS[i].icon = d.icons[0].src;
            });
        }
        suggests.push(window.settings.suggestedURLS[i].url);
    }

    arr = [...suggests, ...arr ]

    for(let i of arr){
        var ar = i.match(regex);
        if(ar === null) return [og]
        ar = ar.filter(e=>e!='').sort().reverse();

        if(ar[0] == og){
            high.push(i);
        }else if(ar.length >= og.length){
            med.push(i)
        }/*else if(ar.filter(e=>e.length>=og.length/2)){
            low.push(i)
        }*/
    }

    suggestArr = [...high, ...med, ...low];
    return suggestArr.filter((v,i) => suggestArr.indexOf(v) === i);
}

module.exports = class extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        // this.show()
    }

    show(){
        this.style.display = 'inline-block';
        // console.log(getCurrentView().src)
        this.innerHTML = '<current-page></current-page><br><br><div>';
        var div = this.querySelector('div');
        div.innerHTML = '';

        suggest(getCurrentView().src).forEach((value,index,arr)=>{
            div.innerHTML += '<page-suggestion>' + value + '</page-suggestion>';
        });

        document.querySelector('multi-view').appendChild(document.createElement('all-escape'))
    }

    change(text){

        
        var div = this.querySelector('div');
        div.innerHTML = '';
        suggest(text).forEach((value,index,arr)=>{
            div.innerHTML += '<page-suggestion>' + value + '</page-suggestion>';
        });
    }

    hide(){
        this.style.display = 'none';
    }
}