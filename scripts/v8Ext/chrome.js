function exportLocal(mod){
    exports[mod] = require('./' + mod + '.js')
}

exportLocal('webRequest');