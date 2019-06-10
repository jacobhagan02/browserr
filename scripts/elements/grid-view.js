module.exports = class extends HTMLElement{
    constructor(){super()}

    connectedCallback(){
        var rows = this.getAttribute('rows');
        var cols = this.getAttribute('cols');

        var rowTxt = '';
        var colTxt = '';

        let i;
        for(i = 0; i < rows; i++){rowTxt+='100px '}
        for(i = 0; i < cols; i++){colTxt+='100px '}

        this.style.gridTemplateRows = rowTxt;
        this.style.gridTemplateColumns = colTxt;

    }

    attributeChangedCallback(){
        var rows = this.getAttribute('rows');
        var cols = this.getAttribute('cols');

        var rowTxt = '';
        var colTxt = '';

        let i;
        for(i = 0; i < rows; i++){rowTxt+='100px '}
        for(i = 0; i < cols; i++){colTxt+='100px '}

        this.style.gridTemplateRows = rowTxt;
        this.style.gridTemplateColumns = colTxt;
    }
}