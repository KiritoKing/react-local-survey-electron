import { getConfig } from '../util';
import { ipcHanlder } from '../typing';

const getConfigHandler: ipcHanlder = async (_event, _args) => {
  return getConfig();
};

export default getConfigHandler;
