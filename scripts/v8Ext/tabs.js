class Tab{

    static getById(id){

        for(let i of tabs.children){
            if(i.num == id){
                return new Tab(i);
            }
        }
    }

    constructor(tab){
        this.__tabEle = tab;
    }

    get id(){
        return __tabEle.num;
    }

    get index(){
        return 0
    }

    get windowId(){
        return require('electron').remote.getCurrentWindow().id
    }

    get openerTabId(){
        return undefined;
    }

    get selected(){
        return this.__tabEle.hasAttribute('show');
    }

    get highlighted(){
        return this.selected;
    }

    get active(){
        return true;
    }

    get pinned(){
        return this.__tabEle.hasAttribute('unclosable')
    }

    get audible(){
        return this.__tabEle.view.view.isCurrentlyAudible()
    }

    get discarded(){
        return false;
    }

    get autoDiscardable(){
        return false;
    }

    get mutedInfo(){

        var ele = this.__tabEle;

        return {
            muted : ele.hasAttribute('muted'),
            reason : (ele.__muter === undefined) ? "user" : ele.__muter,
            extensionId : ele.__extMuter
        }
    }

    get url(){

    }

    get title(){

    }

    get faviconUrl(){

    }

    get status(){

    }

    get incognito(){

    }

    get width(){

    }

    get height(){

    }

    get sessionId(){

    }
}


module.exports = class tabs{
    get(tabId, callback){

    }

    getCurrent(callback){

    }

    connect(tabId, connectInfo){

    }

    sendRequest(tabId, request, responseCallback){

    }

    sendMessage(tabId, message, options, responseCallback){

    }

    getSelected(windowId, callback){

    }

    getAllInWIndow(windowId, callback){
        
    }

    create(createProperties, callback){

    }

    duplicate(tabId, callback){

    }

    query(queryInfo, callback){

    }

    highlight(highlightInfo, callback){

    }

    update(tabId, updateProperties){

    }

    move(tabIds, moveProperties, callback){

    }

    reload(tabId, reloadProperties, callback){

    }

    remove(tabIds, callback){

    }

    detectLanguage(tabId, callback){

    }

    captureVisibleTab(windowId, options, callback){

    }

    executeScript(tabId, details, callback){

    }

    insertCSS( tabId, details, callback){

    }

    setZoom(tabId, zoomFactor, callback){

    }

    getZoom(tabId, callback){

    }

    setZoomSettings(tabId, zoomSettings, callback){

    }

    getZoomSettings(tabId, callback){
        
    }

    discard(tabId, callback){
        
    }

    goForward(tabId, callback){

    }

    goBack(tabId, callback){

    }

    get onCreated(){
        return {
            addListener(listener){

            }
        }
    }

    get onUpdated(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onMoved(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onSelectionChanged(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onActiveChanged(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onActivated(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onHighlightChanged(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onHighlighted(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onDetached(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onAttached(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onRemoved(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onReplaced(){
        return {
            addListener(listener){
                
            }
        }
    }

    get onZoomChange(){
        return {
            addListener(listener){
                
            }
        }
    }

}