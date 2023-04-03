import path from 'path';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import xlsx from 'node-xlsx';
import dayjs from 'dayjs';
import { dialog, FileFilter } from 'electron';
import { getBrowserWindow, getConfig } from '../util';
import { ipcHanlder, IResult } from '../typing';

// 入参要求：arg[0]=导出的问卷id
const exportResultHandler: ipcHanlder = async (event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const surveyId = args[0] as string;
  const surveyName = args[1] as string;
  console.log(`Exporting: ${surveyId}`);
  const config = getConfig();

  // 选择输出地址
  const window = getBrowserWindow(event);
  if (window == null) return;
  const filters: FileFilter[] = [{ name: 'Excel工作簿', extensions: ['xlsx'] }];
  const { canceled, filePath: savePath } = await dialog.showSaveDialog({
    title: '选择导出路径',
    defaultPath: path.join(
      config.workFolder,
      `${surveyName ?? 'untitled'}-${dayjs().valueOf()}.xlsx`
    ),
    filters,
  });
  if (canceled || !savePath) return;

  const dirPath = path.join(config.workFolder, 'results', surveyId);
  if (!existsSync(dirPath)) return;

  const table = [];
  const filePaths = readdirSync(dirPath);
  for (let i = 0; i < filePaths.length - 1; i += 1) {
    const textFile = readFileSync(path.join(dirPath, filePaths[i]), 'utf-8');
    const data = JSON.parse(textFile) as IResult;
    // eslint-disable-next-line no-continue
    if (!data.data) continue;
    console.log(JSON.stringify(data.data));
    if (table.length === 0) table.push(Object.keys(data.data));
    table.push(Object.values(data.data));
  }

  const buffer = xlsx.build([{ name: 'Sheet1', data: table, options: {} }]);
  writeFileSync(savePath, buffer, { flag: 'w', encoding: 'binary' });
};

export default exportResultHandler;
