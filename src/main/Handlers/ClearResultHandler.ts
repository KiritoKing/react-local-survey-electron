import { existsSync, rmSync } from 'fs';
import path from 'path';
import { ipcHanlder } from '../typing';
import { getConfig } from '../util';

// 入参要求：args[0]=问卷ID string
const clearResultHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const surveyId = args[0] as string;
  console.log(`Removing: ${surveyId}`);

  const config = getConfig();
  const dirPath = path.join(config.workFolder, 'results', surveyId);
  if (!existsSync(dirPath)) return;
  rmSync(dirPath, { recursive: true });
};

export default clearResultHandler;
