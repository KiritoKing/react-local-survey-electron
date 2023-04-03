import { existsSync, rmSync } from 'fs';
import path from 'path';
import { ipcHanlder } from '../typing';
import { clearResultOfSurvey, getConfig } from '../util';

// 入参要求：args[0]=问卷ID
const deleteSurveyHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const surveyId = args[0] as string;

  const config = getConfig();
  const surveyPath = path.join(
    config.workFolder,
    'surveys',
    `${surveyId}.json`
  );
  if (!existsSync(surveyPath)) return;
  rmSync(surveyPath, { recursive: true });

  clearResultOfSurvey(surveyId);
  console.log(`Results and survey removed: ${surveyId}`);
};

export default deleteSurveyHandler;
