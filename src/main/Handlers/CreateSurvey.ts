import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { getConfig } from '../util';
import { ipcHanlder, ISurvey } from '../typing';

// SendMessage - 入参要求：arg[0]=ISurvey对象
const createSurveyHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  console.log(`Creating: ${args[0].id}`);

  const config = getConfig();
  let savingPath = path.join(config.workFolder, 'surveys');
  console.log(savingPath);
  if (!existsSync(savingPath)) mkdirSync(savingPath);
  const newSurvey = args[0] as ISurvey;
  savingPath = path.join(savingPath, `${newSurvey.id}.json`);
  writeFileSync(savingPath, JSON.stringify(newSurvey));
};

export default createSurveyHandler;
