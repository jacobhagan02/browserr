const mozAlarms = require('../mozExt/alarms.js');

module.exports = class {
    /**
     * 
     * @param {String} name 
     * @param {object} alarmInfo 
     */
    create(name, alarmInfo){
        mozAlarms.create(name, alarmInfo);
    }

    /**
     * 
     * @param {string} name 
     * @param {Function} callback 
     */
    get(name, callback){
        mozAlarms.get(name).then(callback);
    }

    /**
     * 
     * @param {Function} callback 
     */
    getAll(callback){
        mozAlarms.getAll().then(callback);
    }

    /**
     * 
     * @param {string} name 
     * @param {Function} callback 
     */
    clear(name, callback){
        mozAlarms.clear(name).then(callback);
    }

    /**
     * 
     * @param {Function} callback 
     */
    clearAll(callback){
        mozAlarms.clearAll().then(callback);
    }
}