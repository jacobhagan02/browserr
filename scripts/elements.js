/**
 * @description function to read a url and construct a new string that will color it
 * @param {string} url 
 * @returns an array of important vs unimportant text
 */
function urlBreadcrumbs(url){
    var a = url.substring(url.indexOf('/',8)).split('/');
    a.shift();
    return a;
}

/**
 * @description Reads a file and returns all instances of each object property name and changes it to the value
 * @param {string} filename The directory in context of the current directory to read from
 * @param {object} replacements an object of changes where each property name is a value to be changed and each property value is the value to change it to
 * @returns The changed object
 * @requires fs
 */
function preprocess(filename,replacements){
    var txt = require('fs').readFileSync(__dirname+'/'+filename).toString();
    for(var i in replacements){
        var regex = new RegExp(i,'g');
        txt=txt.replace(regex,replacements[i]);
    }

    return txt;
}

/**
 * @description Reads the css and changes it based on the values in its theme
 * 
 * @param {string} theme 
 */
function doTheme(theme){

    var darkgray = "hsl(0,0%,80%)";
    var lightgrey = "hsl(0,0%,90%)";
    var lighter = "hsl(0,0%,100%)";
    var tabRight = "hsl(0,0%,70%)";
    var black = "hsl(0,0%,50%)";
    var bright = 'white';

    if(theme == 'bright'){
        bright = "hsl(0,0%,80%)";
        black = "hsl(0,0%,90%)";
        tabRight = "hsl(0,0%,100%)";
        lighter = "hsl(0,0%,70%)";
        lightgrey = "hsl(0,0%,50%)";
        darkgray = 'white';
    }

    if(theme == 'dark'){
        darkgray = "hsl(0,0%,20%)";
        lightgrey = "hsl(0,0%,10%)";
        lighter = "hsl(0,0%,0%)";
        tabRight = "hsl(0,0%,30%)";
        black = "hsl(0,0%,50%)";
        bright = 'black';
    }


    var normalStyle = document.createElement('style');
    normalStyle.innerHTML = preprocess('style.css',{
        "darkgray":darkgray,
        "darkgrey":darkgray,
        "lightgrey":lightgrey,
        "lightgray":lightgrey,
        "rgb(220,220,220)":lighter,
        "rgb(50,50,50)":tabRight,
        "black":black,
        "#ffffff":bright,
        "white":bright,
        "whitesmoke":bright
    });

    document.querySelector('head').appendChild(normalStyle);
}


doTheme('b');
