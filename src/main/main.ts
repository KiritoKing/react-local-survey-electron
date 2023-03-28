/* eslint-disable no-console */
/* eslint-disable global-require */

import path from 'path';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { resolveHtmlPath } from './util';
import importFileHandler from './Handlers/ImportFileHandler';
import openFolderHandler from './Handlers/OpenFolderHandler';
import saveResultHandler from './Handlers/SaveResultHandler';

let mainWindow: BrowserWindow | null = null;

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  Menu.setApplicationMenu(null);
};

// 事件监听
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });

    // 注册IPC通信事件
    ipcMain.handle('import-file', importFileHandler);
    ipcMain.handle('open-folder', openFolderHandler);
    ipcMain.on('save-result', saveResultHandler);

    // eslint-disable-next-line promise/always-return
    if (process.env.NODE_ENV === 'production') {
      const sourceMapSupport = require('source-map-support');
      sourceMapSupport.install();
    }
  })
  .catch(console.log);
