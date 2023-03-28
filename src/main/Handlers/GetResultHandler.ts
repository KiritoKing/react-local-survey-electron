import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { ipcHanlder } from '../typing';
import { getConfig } from '../util';

// 编码要求：arg[0]=需要读取的问卷id:string
const getResultHandler: ipcHanlder = async (_event, args) => {
  if (!(args && args[0])) return null; // 参数不正确
  console.log(`Reading: ${args}`);
  const surveyId = args as string;
  const config = getConfig();
  const filePath = path.join(
    config.workFolder,
    'results',
    surveyId,
    'cache.json'
  );
  if (!existsSync(filePath)) return null;
  const cache = JSON.parse(readFileSync(filePath, 'utf-8'));
  return cache;
};

export default getResultHandler;
