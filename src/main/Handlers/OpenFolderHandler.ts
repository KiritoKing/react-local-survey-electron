import { IpcMainInvokeEvent } from 'electron';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { ISurvey } from 'main/typing';
import path from 'path';
import { getConfig } from '../util';

// eslint-disable-next-line no-unused-vars
async function openFolderHandler(_event: IpcMainInvokeEvent, _args: any) {
  const config = getConfig();
  const surveysPath = path.join(config.workFolder, 'surveys');
  console.log(surveysPath);
  if (!existsSync(surveysPath)) {
    mkdirSync(surveysPath);
    return null;
  }

  const files = readdirSync(surveysPath);
  console.log(files.length);
  const jsonFiles = files.filter((file) => path.extname(file) === '.json');
  console.log(jsonFiles.length);

  const results: Array<ISurvey> = [];
  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < jsonFiles.length; i += 1) {
    const filePath = path.join(surveysPath, jsonFiles[i]);
    const data = readFileSync(filePath, 'utf-8');
    const survey = JSON.parse(data) as ISurvey;

    if (survey?.id && survey?.name && survey?.data) {
      results.push(survey);
    }
  }
  if (results.length === 0) return null;
  return results;
}

export default openFolderHandler;
