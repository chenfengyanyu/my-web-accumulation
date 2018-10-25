const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

var win = new BrowserWindow({ width: 100, height: 100 });
win.loadURL('http://www.jartto.wang');