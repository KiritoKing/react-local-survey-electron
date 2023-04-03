/* eslint-disable no-unused-vars */
import { IpcMainInvokeEvent, IpcMainEvent } from 'electron';

export interface ISurvey {
  id: string;
  name: string;
  lastModified?: string | number;
  creator?: string;
  data: any;
}

export interface ISurveyCache {
  id: string;
  name: string;
  lastModified?: string;
  creator?: string;
  data?: any; // 可能含有data
  path: string;
}

export interface IConfig {
  offlineMode: boolean;
  workFolder: string;
  needPassword: boolean;
  password?: string;
}

export interface ipcHanlder {
  (event: IpcMainInvokeEvent | IpcMainEvent, args: any): Promise<any> | void;
}

export interface IResult {
  id: string;
  surveyId: string;
  contestant?: string;
  valid: boolean;
  time: number; // UNIX时间戳
  data: any;
}

export interface IResultCache {
  id: string;
  contestant?: string;
  time: number;
  valid: boolean;
}
