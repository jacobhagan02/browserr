class StorageArea{
    constructor(windowProperty){
        this.__objectName = windowProperty;
    }

    get(keys, callback){
        if(keys === null){
            callback(window[this.__objectName]);
        }
        else
        {
            var arr;

            if(keys.toString() === keys){
                arr = [keys];
            } else if (keys.constructor() === []){
                arr = keys;
            } else if (keys.toString() === "[object Object]"){
                arr = Object.keys(keys);
            }

            var obj = {};
            for(let i of arr){
                obj[i] = window[this.__objectName][i];
            }

            callback(obj)

        }
    }

    getBytesInUse(keys, callback){
        var obj = this.get(keys);
        var num = Buffer.byteLength(JSON.stringify(obj)) - 2;

        callback(num);
    }

    set(items, callback){
        Object.assign(window[this.__objectName], items);

        callback();
    }

    remove(keys, callback){
        if(keys.constructor() !== []){
            keys = [keys]
        }

        for(let i of keys){
            delete window[this.__objectName][i];
        }

        callback()
    }

    clear(callback){
        window[this.__objectName] = {};
        callback();
    }
}

function makeChange(oldVal, newVal){
    return {oldValue : oldVal, newValue: newVal}
}


module.exports = class Storage{
    static get sync(){
        if(window.settings.extStorageSync === undefined)
            window.settings.extStorageSync = {}

        return new StorageArea(extStorageSync);
    }
}