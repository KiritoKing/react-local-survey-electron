import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { ipcHanlder, IResult, IResultCache } from '../typing';
import { getConfig } from '../util';

function generateCache(dirPath: string): boolean {
  if (!existsSync(dirPath)) return false;
  const cache: IResultCache[] = [];
  const filePaths = readdirSync(dirPath);
  for (let i = 0; i < filePaths.length; i += 1) {
    const textFile = readFileSync(path.join(dirPath, filePaths[i]), 'utf-8');
    const data = JSON.parse(textFile) as IResult;
    // eslint-disable-next-line no-continue
    if (!data.data) continue;
    cache.push({ ...data });
  }
  writeFileSync(path.join(dirPath, 'cache.json'), JSON.stringify(cache));
  return true;
}

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
  if (
    !existsSync(filePath) &&
    !generateCache(path.join(config.workFolder, 'results', surveyId))
  )
    return [];
  const cache = JSON.parse(readFileSync(filePath, 'utf-8'));
  return cache;
};

export default getResultHandler;
