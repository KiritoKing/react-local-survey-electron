export interface ISurvey {
  id: string;
  name: string;
  data: any;
}

export interface IConfig {
  offlineMode: boolean;
  workFolder: string;
  needPassword: boolean;
  password?: string;
}
