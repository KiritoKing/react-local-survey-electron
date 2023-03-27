export interface ISurvey {
  id: string;
  name: string;
  lastModified?: string;
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
