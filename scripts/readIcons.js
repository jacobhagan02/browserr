
/**
 * @class IconSet
 * @description reads the icon pack for the current user
 */
module.exports = class IconSet {
    /**
     * 
     * @param {string} name 
     */
    constructor(name){
        this.name = name;

        var obj = JSON.parse(require('fs').readFileSync(__dirname+'/'+'locations.json').toString());
        this.dir = __dirname+'/'+obj[name];
        this.icons = JSON.parse(require('fs').readFileSync(this.dir+'/icons.json').toString());
    }

    read(name){
        return require('fs').readFileSync(this.dir+'/'+this.icons[name]);
    }

    getDir(name){
        return this.dir+'/'+this.icons[name];
    }
}
