module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.innerHTML = `
        
        <st-btn>New Tab</st-btn>
        <st-win>New Window</st-win>
        <st-br></st-br>

        <st-find>Find...</st-find>
        <st-br></st-br>

        <st-history>History</st-history>
        <st-bookmarks>Bookmarks</st-bookmarks>
        <st-br></st-br>

        <st-zs></st-zs>
        <st-br></st-br>

        <st-settings>Settings</st-settings>
        <st-dev>Developer Tools</st-dev>
        <st-multi>Multi View</st-multi>
        `.trim();
    }

    hide(){
        this.classList.remove('display')
    }
}