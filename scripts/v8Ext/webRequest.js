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

exports.onSendHeaders = {
    addListener(callback){
        onHeaders.push(callback);
    }
}

exports.onHeadersReceived = {
    addListener(callback){
        onHeadRecive.push(callback);
    }
}


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

    for(let i of beforeListeners){
        var current = i(cbD);
        if(current){
            if(current.cancel === true){
                response.cancel = current.cancel;
            }

            if(current.redirectURL && typeof current.redirectURL === "string"){
                response.redirectURL = current.redirectURL;
            }
        }
    }

    cb( response );
});

require('electron').session.defaultSession.webRequest.onBeforeSendHeaders(function converter(details,cb){
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

    for(let i of beforeHeaders){
        var current = i(cbD);
        if(current){
            if(current.cancel === true)
                response.canel = current.cancel;

            if(current.requestHeaders){
                cbD.requestHeaders = current.requestHeaders;
                response.requestHeaders = current.requestHeaders;
            }
        }
    }

    cb(response)
});

require('electron').session.defaultSession.webRequest.onSendHeaders(function converter(details){
    var cbD = {};
    function transfer(d){
        cbD[d] = details[d]
    }

    transfer('url');
    transfer('method');
    transfer('timestamp');
    transfer('requestHeaders');

    cbD['requestId'] = details['id'];
    cbD['frameId'] = details['webContentsId'];
    cbD['parentFrameId'] = -1;
    cbD.tabId = getCurrentView().tab.num;
    cbD['type'] = details['resourceType'];
    cbD.initiator = details.referrer;

    for(let i of onHeaders){
        i(cbD);
    }
});

require('electron').session.defaultSession.webRequest.onHeadersReceived(function converter(details,cb){
    var cbD= {};

    cbD.requestId = details.id;
    cbD.url = details.url;
    cbD.method = details.method;
    cbD.frameId = details.webContentsId;
    cbD.parentFrameId = -1;
    cbD.tabId = getCurrentView().tab.num;
    cbD.type = details.resourceType;
    cbD.initiator = details.referrer;
    cbD.timeStamp = details.timestamp;

    cbD.statusLine = details.statusLine;
    cbD.responseHeaders = details.responseHeaders;

    var response = {  }

    for(let i of onHeadRecive){
        var current = i(cbD);

        if(current.cancel === true)
            response.cancel = true;
        
        if(current.responseHeaders !== undefined && typeof current.responseHeaders === 'object'){
            cbD.responseHeaders = details.responseHeaders;
            response.responseHeaders = details.responseHeaders;
        }

        if(current.statusLine !== undefined && typeof current.statusLine === "string"){
            cbD.statusLine = current.statusLine;
            response.statusLine = current.statusLine;
        }
    }

    cb(response);
});

/* FROM GITHUB ISSUE:
this is going to take forever... I still need to do 
    onAuthRequired
    onResponseStarted
    onBeforeRedirect
    onCompleted
    onErrorOccurred
    onActionIgnored
*/

/* FROM GITHUB ISSUE:
onActionIgnored can be like called each time that a canceled is set to true

*/