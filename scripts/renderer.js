// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.currentTab = window.document.body.querySelector('pg-tab');

// Should probably assign getters and setters in the elements.js file

require('./webviewele.js');
require('./customElements.js');
require('./tabContext.js');

require('electron').remote.getCurrentWindow().on('maximize',()=>{
    if(process.platform === 'darwin')
        document.querySelector('page-tabs').style.paddingLeft = '';
    else
        document.querySelector('ch-max').setMaxBtn(2);
    

    console.trace()
});

require('electron').remote.getCurrentWindow().on('unmaximize',()=>{
    if(process.platform === 'darwin')
        document.querySelector('page-tabs').style.paddingLeft = '70px';
    else
        document.querySelector('ch-max').setMaxBtn(1);

    console.trace()
});
