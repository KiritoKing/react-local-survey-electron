/* eslint-disable no-console */
/* eslint-disable global-require */

import path from 'path';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { getConfig, resolveHtmlPath } from './util';
import importFileHandler from './Handlers/ImportFile';
import openFolderHandler from './Handlers/OpenFolder';
import saveResultHandler from './Handlers/SaveResultHandler';
import getResultHandler from './Handlers/GetResult';
import exportResultHandler from './Handlers/ExportResult';
import clearResultHandler from './Handlers/ClearResult';
import saveSurveyHandler from './Handlers/SaveSurvey';
import deleteSurveyHandler from './Handlers/DeleteSurvey';
import getConfigHandler from './Handlers/GetConfig';
import saveConfigHandler from './Handlers/SaveConfig';
import selectFolderHandler from './Handlers/SelectFolder';

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
    frame: false,
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
    const title = getConfig()?.title;
    if (title) mainWindow.title = title;
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
    ipcMain.handle('get-result', getResultHandler);
    ipcMain.handle('get-config', getConfigHandler);
    ipcMain.handle('select-folder', selectFolderHandler);

    ipcMain.on('save-result', saveResultHandler);
    ipcMain.on('export-result', exportResultHandler);
    ipcMain.on('clear-result', clearResultHandler);
    ipcMain.on('save-survey', saveSurveyHandler);
    ipcMain.on('delete-survey', deleteSurveyHandler);
    ipcMain.on('save-config', saveConfigHandler);

    // eslint-disable-next-line promise/always-return
    if (process.env.NODE_ENV === 'production') {
      const sourceMapSupport = require('source-map-support');
      sourceMapSupport.install();
    }
  })
  .catch(console.log);

// eslint-disable-next-line import/prefer-default-export
export const setWindowTitle = (title: string) => {
  if (mainWindow) {
    mainWindow.setTitle(title);
  }
};
