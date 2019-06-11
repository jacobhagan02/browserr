module.exports = class extends HTMLElement{
    constructor(){super()}

    connectedCallback(){
        
    }

    show(){
        var title = this.parentElement.querySelector('tb-title').innerText;
        var url = this.parentElement.view.view.src;

        this.innerHTML = `<b>${title}</b><br><span>${url}</span>`;
        // console.log(this.parentElement.offsetLeft)
        this.style.left = this.parentElement.offsetLeft + 'px';
    }
}