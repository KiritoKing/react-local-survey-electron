import { writeFileSync } from 'fs';
import path from 'path';
import { getConfig } from '../util';
import { IConfig, ipcHanlder } from '../typing';

// SendMessage: 入参要求：arg[0]=IConfig对象
const saveConfigHandler: ipcHanlder = (_event, args) => {
  if (!(args && args[0])) return; // 参数不正确
  const newConfig = args[0] as IConfig;
  const oldConfig = getConfig();
  const configPath = path.join(oldConfig.workFolder, 'config.json');
  writeFileSync(configPath, JSON.stringify(newConfig));
  console.log('Config updated');
};

export default saveConfigHandler;
