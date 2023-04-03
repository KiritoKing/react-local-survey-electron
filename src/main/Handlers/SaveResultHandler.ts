import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { getConfig, insertToResultCache } from '../util';
import { ipcHanlder, IResult } from '../typing';

// 入参要求：arg[0]=结果对象
const saveResultHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  console.log(`Saving: ${args[0].id}`);

  const config = getConfig();
  let resultPath = path.join(config.workFolder, 'results');
  console.log(resultPath);
  if (!existsSync(resultPath)) mkdirSync(resultPath);
  const result = args[0] as IResult;
  resultPath = path.join(resultPath, result.surveyId);
  if (!existsSync(resultPath)) mkdirSync(resultPath);
  resultPath = path.join(resultPath, `${result.id}.json`);
  writeFileSync(resultPath, JSON.stringify(result));
  insertToResultCache(result);
};

export default saveResultHandler;
