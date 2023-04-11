/* eslint-disable no-console */
import { IpcMainInvokeEvent, dialog } from 'electron';
import path from 'path';
import { getBrowserWindow } from '../util';

// eslint-disable-next-line no-unused-vars
async function selectFolderHandler(event: IpcMainInvokeEvent, _args: any) {
  const window = getBrowserWindow(event);
  if (window == null) return null;

  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '选择新的工作目录',
    defaultPath: path.join(process.cwd(), 'workspace'),
    properties: ['openDirectory'],
  });

  if (!canceled) {
    return filePaths[0];
  }
  return null;
}

export default selectFolderHandler;
