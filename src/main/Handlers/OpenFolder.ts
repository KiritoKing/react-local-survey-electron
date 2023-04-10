/* eslint-disable no-console */
import { IpcMainInvokeEvent } from 'electron';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { ISurvey } from '../typing';
import { getConfig } from '../util';

// eslint-disable-next-line no-unused-vars
async function openFolderHandler(_event: IpcMainInvokeEvent, _args: any) {
  const config = getConfig();
  const surveysPath = path.join(config.workFolder, 'surveys');
  if (!existsSync(surveysPath)) {
    mkdirSync(surveysPath);
    return null;
  }

  const files = readdirSync(surveysPath);
  const jsonFiles = files.filter((file) => path.extname(file) === '.json');
  console.log(`Opening ${jsonFiles.length} Files in: ${surveysPath}`);

  const results = [];
  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < jsonFiles.length; i += 1) {
    const filePath = path.join(surveysPath, jsonFiles[i]);
    const data = readFileSync(filePath, 'utf-8');
    const survey = JSON.parse(data) as ISurvey;

    if (survey?.id && survey?.name && survey?.data) {
      results.push({ ...survey, path: filePath });
    }
  }
  if (results.length === 0) return [];
  return results;
}

export default openFolderHandler;
