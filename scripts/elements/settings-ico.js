const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);


module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.innerHTML = '<img src="'+IconSet.getDir("subMenu")+'" height="25" width="25" />'
        
    }

}