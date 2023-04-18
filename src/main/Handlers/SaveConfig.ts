import { writeFileSync } from 'fs';
import path from 'path';
import { IConfig, ipcHanlder } from '../typing';
import { setWindowTitle } from '../main';

// SendMessage: 入参要求：arg[0]=IConfig对象 arg[1]=config.json路径
const saveConfigHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const config = args[0] as IConfig;
  const configPath = args[1] as string;

  if (config?.title) setWindowTitle(config.title);
  writeFileSync(path.join(process.cwd(), 'config'), configPath);
  writeFileSync(configPath, JSON.stringify(config));
  console.log('Config updated');
};

export default saveConfigHandler;
