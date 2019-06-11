class Tab{
    constructor(tab){
        this.__tabEle;
    }

    get id(){
        return __tabEle.num;
    }

    get index(){
        return 0
    }

    get windowId(){

    }

    get openerTabId(){
        
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