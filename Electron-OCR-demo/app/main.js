const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow

const isDevelopment = true;
if (isDevelopment) {
  /* eslint-disable */
  require('electron-reload')(__dirname, {
    electron: require('${__dirname}/../../node_modules/electron'),
    ignored: /node_modules|[\/\\]\./
  });
}
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  // 启动文件入口，如 index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // 开启 Chromium DevTools
  mainWindow.webContents.openDevTools()
  // 监听窗口关闭事件
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
// 加载就绪
app.on('ready', createWindow)
// 监听所有窗口关闭的事件
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 激活窗口
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})