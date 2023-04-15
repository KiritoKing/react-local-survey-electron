import { IConfig } from 'main/typing';
import { useEffect, useState } from 'react';

function useConfig() {
  const [config, setConfig] = useState<IConfig>();
  useEffect(() => {
    const cache = window.localStorage.getItem('configCache');
    if (!cache) {
      window.electron.ipcRenderer
        .invoke('get-config')
        .then((data) => {
          setConfig(data);
          return null;
        })
        .catch(console.log);
    } else {
      setConfig(JSON.parse(cache));
    }
  }, []);
  return config;
}

export default useConfig;
