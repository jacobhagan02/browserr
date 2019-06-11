var alarms = {};
var listeners = [];

module.exports = class alarms{
    static async clear(name = ""){
        if(alarms[name]) return false;
        clearTimeout(alarms[name].timeout)
        return true;
    }

    static async clearAll(){
        this.getAll().forEach((v)=>{
            clearTimeout(v.timeout)
        });

        alarms = {};
        return true;
    }

    static async create(name, alarmInfo){
        if(typeof name !== "string"){ alarmInfo = name; name = ""; };

        var timeout;
        if(alarmInfo.when){
            timeout = alarmInfo.when - Date.now();
        }else if(alarmInfo.delayInMinutes){
            timeout = alarmInfo.delayInMinutes * 60 * 1000;
        }

        function fn(){

        }

        var time = setTimeout(fn,timeout)

        var alarmObj = {
            name : name,
            scheduledTime : Date.now() + timeout,
            periodInMinutes : alarmInfo.periodInMinutes,
            timeout : time
        }

        alarms[name] = alarmObj;

        
    }

    static async get(name = ""){
        return {name : name, scheduledTime : alarms[name].scheduledTime, periodInMinutes : alarms[name].periodInMinutes};
    }

    static getAll(){
        var arr = []

        for(let i in alarms){
            var obj = alarms[i];

            delete obj.timeout;

            arr.push(this.get())
        }

        return arr;
    }

    static get onAlarm(){

        var obj = {}
        obj.addListener = (listener) => {
            listeners.push(listener);
        }

        obj.removeListener = (listener) => {
            
            var newArr = [];

            for(let i of listeners){
                if(i != listener){
                    newArr.push(i);
                }
            }

            listener = newArr;
        }

        obj.hasListener = (listener) => {
            for(let i of listeners){
                if(i == listener){
                    return true;
                }
            }
            return false;
        }

        return obj;
    }
}