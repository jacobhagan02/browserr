# Browser

A simple secure browser that is constantly being made better.

## Repo rules

This repository has certain rules to make sure that everything is running smoothly. And people working on all this are able to get to fixing problems and creating new features faster.


### Issues
Refer [here](https://github.com/eatmyvenom/browserr/blob/master/Issues.md) on how to create issues or use the avalible templates to create an issue

### Pull requests

Refer [here](https://github.com/eatmyvenom/browserr/blob/master/Pulls.md) on how to do pull requests

## Package

To Package this app on your own is simple
First you need a copy of node installed on your computer as well as npm and git.

Step one is installing pkg:
```bash
npm i pkg -g
```

From there create a file called `Browser.js`.
In that file put this code in: 
```javascript
const { spawn } = require('child_process');
var ele = 'electron'

spawn(require(process.cwd() + "/app/node_modules/" + ele), ['./app'],{
    detached:true
});

process.exit(0);
```

After that open up a terminal in the folder where that file is and do this.
```bash
pkg Browser.js
```
An error will show up, ignore it.

Finally we get a copy of the app from github
```bash
git clone https://github.com/eatmyvenom/browserr.git
cd browserr
```

Now we create a folder called `app`
Put all of the folders in browserr into app
Then take to executable created with pkg and put it in the same directory as `app`

Then double click the executable and the app will come up!
