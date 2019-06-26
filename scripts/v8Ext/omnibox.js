module.exports = class Omnibox{
    setDefaultSuggestion(suggestion){

        var txt = suggestion.description;
        document.querySelector('omni-box').addSuggest(txt);
    }

    get onInputStarted(){
        return {
            addListener(callback){
                document.querySelector('omni-box').inputStarts.push(callback);
            }
        }
    }

    get onInputChanged(){
        return {
            addListener(callback){
                document.querySelector('omni-box').inputChange.push(callback);
            }
        }
    }

    get onInputEntered(){
        return {
            addListener(callback){
                document.querySelector('omni-box').inputEnter.push(callback);
            }
        }
    }

    get onInputCancelled(){
        return {
            addListener(callback){
                document.querySelector('omni-box').inputCancel.push(callback);
            }
        }
    }

    get onDeleteSuggestion(){
        return {
            addListener(callback){
                document.querySelector('omni-box').deletes.push(callback);
            }
        }
    }
}