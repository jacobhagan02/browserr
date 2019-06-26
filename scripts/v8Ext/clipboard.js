const nativeImage = require('electron').remote.nativeImage
const buffer = require('buffer');
const callbacks = [];

module.exports = class{

    /**
     * 
     * @param {ArrayBuffer} imageData 
     * @param {string} type enum of "png" or "jpeg"
     * @param {Object[]} additionalItems
     * @param {function} callback 
     */
    static setImageData(imageData, type, additionalItems, callback){
        var bfr = buffer.from(imageData);
        var img = nativeImage.createFromBuffer(bfr);
        var image = (type == 'png') ? img.toPNG({scaleFactor : 1.0}) : img.toJPEG(100);

        require('electron').remote.clipboard.writeImage(image);
        if(callback){callback();}
        for(let i of callbacks){
            i();
        }
    }

    static get onClipboardDataChanged(){
        this.addListener = (callback) => {
            callbacks.push(callback)
        }
    }
}