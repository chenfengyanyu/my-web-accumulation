const electron = require('electron')
const shell = electron.shell;
shell.beep();
// shell.openItem('/Users/Jartto/Documents/my-demo');
shell.openExternal('http://jartto.wang');