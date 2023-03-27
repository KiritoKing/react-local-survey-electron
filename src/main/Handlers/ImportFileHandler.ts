/* eslint-disable no-console */
import { IpcMainInvokeEvent, dialog, FileFilter } from 'electron';
import { readFileSync } from 'fs';
import path from 'path';
import { getBrowserWindow, getNameFromPath } from '../util';

// eslint-disable-next-line no-unused-vars
async function importFileHandler(event: IpcMainInvokeEvent, _args: any) {
  const window = getBrowserWindow(event);
  if (window == null) return null;

  const filters: FileFilter[] = [
    { name: '问卷文件（.JSON）', extensions: ['json'] },
  ];
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '导入一个问卷文件',
    defaultPath: path.join(process.cwd(), 'workspace'),
    filters,
    properties: ['openFile', 'promptToCreate'],
  });

  if (!canceled) {
    try {
      const data = readFileSync(filePaths[0], 'utf-8');
      const survey = JSON.parse(data);

      return {
        name: getNameFromPath(filePaths[0]),
        data: survey,
      };
    } catch (e) {
      console.error('JSON format error!');
      console.log(e);
    }
  }
  return null;
}

export default importFileHandler;
