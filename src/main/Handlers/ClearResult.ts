import { ipcHanlder } from '../typing';
import { clearResultOfSurvey } from '../util';

// 入参要求：args[0]=问卷ID string
const clearResultHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const surveyId = args[0] as string;
  console.log(`Removing: ${surveyId}`);

  clearResultOfSurvey(surveyId);
};

export default clearResultHandler;
