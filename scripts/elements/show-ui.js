const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

module.exports = class extends HTMLElement {
    constructor () { super(); }

    connectedCallback(){
        this.innerHTML = `<img src="${IconSet.getDir('unfullscreen')}" height="30" width="45" />`;
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        showUI();
    }
}