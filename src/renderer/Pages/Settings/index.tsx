import { IConfig } from 'main/typing';
import React, { useEffect, useState } from 'react';

const SettingsPage = () => {
  const [config, setConfig] = useState<IConfig>();
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('get-config')
      .then((value: IConfig) => {
        value.workFolder = value.workFolder.replace(/\\/g, '/');
        setConfig(value);
        return true;
      })
      .catch(console.log);
    return () => {};
  }, []);

  return <div>{JSON.stringify(config)}</div>;
};

export default SettingsPage;
