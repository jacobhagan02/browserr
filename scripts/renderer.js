// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./webviewele.js');
require('./customElements.js');


// get rid of web global variable
window.currentTab = window.document.body.querySelector('pg-tab');

