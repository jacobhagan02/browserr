/**
 * @class reader
 */
class reader{

    /**
     * Reads the data in the specified index
     * @param {number} i 
     * @returns the data
     */
    static get(i){
        var obj = this.readAsObj();
        return obj[i];
    }

    /**
     * reads the array as an object
     * @returns the object
     */
    static readAsObj(){
        return window.settings.b;
    }

    /**
     * sets the index to the object
     * @param {number} i 
     * @param {object} d 
     */
    static set(i,d){
        var obj = this.readAsObj();
        obj[i]=d;
        this.writeFromObj(obj);
    }

    /**
     * Removes the item at index i. Shifts all other items in the object to fill it without null values
     * @param {number} i 
     */
    static remove(i){
        var obj = this.readAsObj();
        obj[i]=null;

        let newobj={};
        for(let a in obj){
            if(obj[a]!=null){
                newobj[a] = obj[a];
            }
        }

        this.writeFromObj(newobj);
    }

    /**
     * saves the items
     * @param {object} obj 
     * @requires ./editUser 
     */
    static writeFromObj(obj){
        require('./editUser.js').set('b',obj);
    }
}


module.exports = reader;