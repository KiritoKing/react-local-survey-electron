/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { IConfig } from './typing';

const fs = require('fs');

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function getBrowserWindow(event: IpcMainEvent | IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(event.sender);
}

export function getNameFromPath(filePath: string) {
  if (process.platform === 'win32')
    return filePath.substring(
      filePath.lastIndexOf('\\') + 1,
      filePath.lastIndexOf('.')
    );
  return filePath.substring(
    filePath.lastIndexOf('/') + 1,
    filePath.lastIndexOf('.')
  );
}

export function getConfig(): IConfig {
  const workFolderPath = path.join(process.cwd(), 'workspace');
  if (!existsSync(workFolderPath)) fs.mkdirSync(workFolderPath);
  const configPath = path.join(workFolderPath, 'config.json');
  const defaultConfig = {
    offlineMode: true,
    workFolder: workFolderPath,
    needPassword: false,
  };
  if (!existsSync(configPath))
    writeFileSync(configPath, JSON.stringify(defaultConfig));

  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

export function readSingleSurveyFile(filePath: string) {
  try {
    const data = readFileSync(filePath, 'utf-8');
    const survey = JSON.parse(data);

    return {
      name: getNameFromPath(filePath),
      data: survey,
    };
  } catch (e) {
    console.error('JSON format error!');
    console.log(e);
    return null;
  }
}
