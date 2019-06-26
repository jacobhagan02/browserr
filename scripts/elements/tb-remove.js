function closeTab(){
    //console.log(window.currentTab.tRemove)
    window.currentTab.tRemove();
}

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        
        // nothing
    }

    connectedCallback(){            
    let X = `  <line x1="6" y1="6" x2="14" y2="14" style="stroke:rgba(255, 255, 255, 0.7);stroke-width:1;filter:none;" />
    <line x1="14" y1="6" x2="6" y2="14" style="stroke:rgba(255, 255, 255, 0.7);stroke-width:1;filter:none;" />`

    this.innerHTML = '<svg width="20" height="20" style="stroke:rgba(255, 255, 255, 0.7);strike-width:10;filter:none;">'+X+'</svg>';

    this.addEventListener('click',this.parentElement.remove);
    }

    action(){
        this.parentElement.remove();
    }
}