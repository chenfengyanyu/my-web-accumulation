const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const globalShortcut = require('electron').globalShortcut;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'menu/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.toggleDevTools();
  mainWindow.webContents.inspectServiceWorker();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // 打开文件和目录
  // var win = mainWindow  // BrowserWindow in which to show the dialog
  // const dialog = require('electron').dialog;
  // console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));

  // 打开信息窗
  // const dialog = require('electron').dialog;
  // console.log(dialog.showMessageBox({
  //   browserWindow: mainWindow,
  //   options: {
  //     type: 'error',
  //     title: 'Jartto',
  //     message: 'Hello World',
  //   }
  // }));
  // dialog.showErrorBox('Jartto', 'Hello world')
  
}

const dialog = require('electron').dialog;
const Menu = electron.Menu;
const Tray = electron.Tray;
var appIcon = null;

app.on('ready', function(){
  createWindow();
  // Register a 'ctrl+x' shortcut listener.
  var ret = globalShortcut.register('ctrl+x', function() {
    dialog.showErrorBox('Jartto', 'ctrl+x is pressed')
  })

  if (!ret) {
    dialog.showErrorBox('Jartto', 'registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('ctrl+x'));

  // 能源区变化，系统挂起和恢复，交流电和电池切换时
  require('electron').powerMonitor.on('suspend', function() {
    console.log('The system is going to sleep');
  });
  require('electron').powerMonitor.on('on-ac', function() {
    console.log('The system is using AC power');
  });

  // protocol使用
  // var protocol = electron.protocol;
  // protocol.registerFileProtocol('atom', function(request, callback) {
  //   console.log(111);
  //   var url = request.url.substr(7);
  //   callback({path: path.normalize(__dirname + '/' + url)});
  // }, function (error) {
  //   if (error)
  //     console.error('Failed to register protocol')
  // });

  // 页头系统托盘图标
  appIcon = new Tray(path.normalize(__dirname + '/image/icon.png'));
  var contextMenu = Menu.buildFromTemplate([
    { label: '菜单一', type: 'radio' },
    { label: '菜单二', type: 'radio' },
    { label: '菜单三', type: 'radio', checked: true },
    { label: '关于', type: 'radio' }
  ]);
  
  appIcon.setToolTip('这是系统托盘！');
  appIcon.setContextMenu(contextMenu);
})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', function() {
  // Unregister a shortcut.
  globalShortcut.unregister('ctrl+x');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// app.dock.hide();
// app.dock.setMenu(menu);

// In main process.
const ipcMain = require('electron').ipcMain;
ipcMain.on('asynchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});