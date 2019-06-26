class DNSRecord {

    constructor(addresses,canonicalName, isTRR){
        this.__addr = addresses;
        this.__canonicalName = canonicalName;
        this.__TRR = isTRR;
    }

    get addresses(){
        return this.__addr;
    }

    get canonicalName(){
        return this.__canonicalName;
    }

    get isTRR(){
        return this.__TRR;
    }
} 

module.exports = class dns {

}