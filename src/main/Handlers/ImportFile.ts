/* eslint-disable no-console */
import { IpcMainInvokeEvent, dialog, FileFilter } from 'electron';
import path from 'path';
import { getBrowserWindow, readSingleSurveyFile } from '../util';

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
    return readSingleSurveyFile(filePaths[0]);
  }
  return null;
}

export default importFileHandler;
