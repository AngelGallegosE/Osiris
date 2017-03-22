const electron = require('electron');
const {app, Menu, BrowserWindow, shell} = require('electron');
const PDFWindow = require('electron-pdf-window');

const path = require('path');
const url = require('url');


require('electron-context-menu')({
  prepend: (params) => [{
    label: 'Rainbow',
    // only show it when right-clicking images
    visible: params.mediaType === 'image'
  }]
});

require('electron-reload')(__dirname + '/bundle.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    backgroundColor: '#ECF0F1',
    width: 800,
    height: 600,
    resizable: true,
    title: 'Osiris',
  });

  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'Open Download Folder',
      click: () => {
        shell.openExternal(`file://${path.join(app.getPath('downloads'), 'Osiris_Downloads')}`);
      }
    },
  ]);

  app.dock.setMenu(dockMenu);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('previewWindow', (location) => {
  const win = new PDFWindow({
    width: 400,
    height: 500
  });
  PDFWindow.addSupport(win);

  win.loadURL(location);
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('setProgressBar', function(progress) {
  mainWindow.setProgressBar(progress || -1);
});

app.on('open-file', function(_, file) {
  shell.openExternal(`file://${file}`);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// exports.openWindow = () => {
//   let win = new BrowserWindow({width:400, height: 200})
//   win.loadURL(`file://${__dirname}/bear.html`)
// }
