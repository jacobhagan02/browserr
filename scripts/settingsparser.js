var $ = document.querySelector('textwrapper');

var currentS = window.settings

function doclose(){
    require('electron').remote.getCurrentWindow().close();
}

function editSettings(setting,value){
    require('./editUser').set(setting,value)
}

function fontWeight(){
    var val = $.querySelector('#weight').value;
    if(val % 50 != 0){
        val = Math.round(val / 50) * 50;
    }
    $.querySelector('#weight').value = val;

    editSettings('font-weight', val);
}

function ZoomIncrement(){
    $.querySelector('#incrementV').innerHTML = $.querySelector('#increment').value;
    editSettings('ZoomIncrement', $.querySelector('#increment').value / 100);
}

function ZoomLevel(){
    $.querySelector('#zlvlV').innerHTML = $.querySelector('#zlvl').value + '%';
    editSettings('ZoomLevel', $.querySelector('#zlvl').value / 100);
}

function iconPack(){
    console.log(this);
    editSettings('iconPack', this.value);
}

$.querySelector('#weight').addEventListener('change',fontWeight);
$.querySelector('#increment').addEventListener('input',ZoomIncrement);
$.querySelector('#zlvl').addEventListener('input',ZoomLevel);

$.querySelectorAll('#icpp').forEach(e=>{
    if(e.value == currentS.iconPack){
        e.checked = true;
    }
    e.addEventListener('click', iconPack);
});

function upFont(){
    $.querySelector('#weight').stepUp();
}

function downFont(){
    $.querySelector('#weight').stepDown();
}

document.querySelector('.close').addEventListener('click',doclose);
$.querySelector('#inc').addEventListener('click',upFont);
$.querySelector('#dec').addEventListener('click',downFont);

function homePage(){
    if(this.value.slice(0,7) == 'https:/' || this.value.slice(0,7) == 'http://'){
        editSettings('homePage',this.value);
    } else {
        urlify(this.value,(url)=>{
            editSettings('homePage',url);
        });
    }
}