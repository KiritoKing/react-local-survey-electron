/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { existsSync, writeFileSync, readFileSync, mkdirSync, rmSync } from 'fs';
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { IConfig, IResult, IResultCache } from './typing';

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
  const cfgPath = path.join(process.cwd(), 'path.cfg'); // 专门用于存储workfolder在哪里的配置文件，里面是config.json的路径

  if (!existsSync(cfgPath)) {
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
    writeFileSync(cfgPath, configPath);
  }

  const configPath = readFileSync(cfgPath, 'utf-8');

  if (!existsSync(configPath)) {
    // 修复删除配置后崩溃bug
    rmSync(cfgPath);
    return getConfig();
  }

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

export function insertToResultCache(result: IResult) {
  const config = getConfig();
  let cachePath = path.join(config.workFolder, 'results');
  if (!existsSync(cachePath)) mkdirSync(cachePath);
  cachePath = path.join(cachePath, result.surveyId);
  if (!existsSync(cachePath)) mkdirSync(cachePath);
  cachePath = path.join(cachePath, `cache.json`);
  if (!existsSync(cachePath)) writeFileSync(cachePath, '[]');
  const cache = readFileSync(cachePath, 'utf-8');
  const cacheObject = JSON.parse(cache) as IResultCache[];
  cacheObject.push({
    ...result,
  });
  writeFileSync(cachePath, JSON.stringify(cacheObject));
}

export function clearResultOfSurvey(surveyId: string) {
  const config = getConfig();
  const dirPath = path.join(config.workFolder, 'results', surveyId);
  if (!existsSync(dirPath)) return;
  rmSync(dirPath, { recursive: true });
}
