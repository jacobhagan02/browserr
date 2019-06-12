var cp = require('child_process');
var spawn = cp.spawn;
var exec = cp.exec;
var execSync = cp.execSync;


var changes = execSync('git diff --name-only').toString().slice(0,-1).split('\n');
var ochanges = {};

for(let i of changes){
    if(i != 'scripts/updates.json' && i != 'users/default.user')
        ochanges[i] = ""
}

var updatesFile = require('fs').readFileSync('scripts/updates.json');
var oldUpdates = JSON.parse(updatesFile);
var num = Object.keys(oldUpdates.patches).length + 1
oldUpdates.patches[num] = {};
oldUpdates.patches[num].files = ochanges
var indented = JSON.stringify(oldUpdates,null,4)

console.log(indented);
require('fs').writeFileSync('scripts/updates.json', indented)