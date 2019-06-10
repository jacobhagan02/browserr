module.exports = class extends HTMLElement{
    constructor(){super()}

    connectedCallback(){

    }

    set pageData(obj){
        var icn = document.createElement('img');
        icn.setAttribute('src') = obj.icon;

        this.link = obj.url;
        
        var spn = document.createElement('span');
        spn.innerHTML = obj.url.slice(obj.url.indexOf('https://') + 8, - obj.url.indexOf('/',8));

        this.appendChild(icn);
        this.appendChild(spn);
    }
}