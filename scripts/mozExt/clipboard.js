const nativeImage = require('electron').remote.nativeImage
const buffer = require('buffer');

module.exports = class{
    static setImageData(imageData, imageType){
        return new Promise((resolve,reject)=>{
            var bfr = buffer.from(imageData);
            var img = nativeImage.createFromBuffer(bfr);
            var image = (imageType == 'png') ? img.toPNG({scaleFactor : 1.0}) : img.toJPEG(100);

            require('electron').remote.clipboard.writeImage(image);
            resolve();
        });
    }
}