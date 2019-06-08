const beforeListeners = [];
const beforeHeaders = []

exports.MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES = 20;

exports.handlerBehaviorChanged = function handlerBehaviorChanged(callback){
    if(callback)
        callback()
}

exports.onBeforeRequest = {
    addListener(callback){
        beforeListeners.push(callback);
    }
}

exports.onBeforeSendHeaders = {
    addListener(callback){
        beforeHeaders.push(callback);
    }
}

function behave(){

require('electron').session.defaultSession.webRequest.onBeforeRequest(function converter(details, cb){        
    var cbD;
    cbD.requestId = details.id;
    cbD.url = details.url;
    cbD.method = details.method;
    cbD.frameId = details.webContentsId;
    cbD.parentFrameId = -1;
    cbD.tabId = getCurrentView().tab.num;
    cbD.type = details.resourceType;
    cbD.timeStamp = details.timestamp;
    cbD.requestBody = { raw : details.uploadData }

    var response = {  };

    for(let i in beforeListeners){
        var current = i(cbD);
        if(current){
            if(current.cancel){
                response.cancel = current.cancel;
            }

            if(current.redirectURL){
                response.redirectURL = current.redirectURL;
            }
        }
    }

    cb( response );
});

require('electron').session.defaultSession.webRequest.onSendHeaders(function converter(details,cb){
    var cbD;
    cbD.requestId = details.id;
    cbD.url = details.url;
    cbD.method = details.method;
    cbD.frameId = details.webContentsId;
    cbD.parentFrameId = -1;
    cbD.tabId = getCurrentView().tab.num;
    cbD.type = details.resourceType;
    cbD.timeStamp = details.timestamp;
    cbD.requestHeaders = details.requestHeaders;

    var response = {  }

    for(let i in beforeHeaders){
        var current = i(cbD);
        if(current){
            if(current.cancel)
                response.canel = current.cancel

            if(current.requestHeaders)
                response.requestHeaders = current.requestHeaders
        }
    }
});

}