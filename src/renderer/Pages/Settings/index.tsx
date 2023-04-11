import { Box, Switch, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IConfig } from 'main/typing';
import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import ConfigItem from 'renderer/Components/ConfigItem';
import PaperSection from 'renderer/Components/PaperSection';
import PropertyEditor from 'renderer/Components/PropertyEditor';
import useModifiedStatus from 'renderer/Hooks/useModifiedStatus';

const SettingsPage = () => {
  const [dataReady, setDataReady] = useState<boolean>(false);

  const [offline, setOffline] = useState<boolean>();
  const [workFolder, setWordFolder] = useState<string>();
  const [needPassword, setNeedPassword] = useState<boolean>();
  const [password, setPassword] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();
  const [modified, saved] = useModifiedStatus();

  // Hook: 首次加载时从文件读取配置
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('get-config')
      .then((value: IConfig) => {
        value.workFolder = value.workFolder.replace(/\\/g, '/');
        setOffline(value.offlineMode);
        setWordFolder(value.workFolder);
        setNeedPassword(value.needPassword);
        setPassword(value.password);
        setUserName(value.userName);
        setDataReady(true);
        modified();
        return true;
      })
      .catch(console.log);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    if (workFolder === undefined || needPassword === undefined) {
      enqueueSnackbar('设置项值无效，保存失败', { variant: 'error' });
      return;
    }
    const newConfig: IConfig = {
      offlineMode: true,
      workFolder,
      needPassword,
      password,
      userName,
    };
    window.electron.ipcRenderer.sendMessage('save-config', [newConfig]);
    saved();
    enqueueSnackbar('设置保存成功', { variant: 'success' });
  };

  if (dataReady)
    return (
      <Box sx={{ padding: '1rem' }}>
        <PaperSection sx={{ padding: '2rem' }} title="程序设置">
          <List>
            <ConfigItem title="工作目录">
              <TextField
                sx={{ flex: 1 }}
                value={workFolder}
                inputProps={{ readOnly: true }}
              />
              <Button variant="contained" sx={{ ml: 2, color: 'white' }}>
                更改
              </Button>
            </ConfigItem>
            <ConfigItem title="离线模式">
              <Switch disabled checked={offline} />
              <Typography sx={{ ml: 2 }} fontSize="0.8rem" color="#7f8c8d">
                线上后台正在开发中
              </Typography>
            </ConfigItem>
          </List>
        </PaperSection>
        <PaperSection sx={{ padding: '2rem', mt: 2 }} title="账户设置">
          <List>
            <ConfigItem title="用户名">
              <PropertyEditor
                name="username"
                initValue={userName}
                binding={setUserName}
              />
            </ConfigItem>
            <ConfigItem title="是否需要密码">
              <Switch
                checked={needPassword}
                onChange={(e) => {
                  setNeedPassword(e.target.checked);
                }}
              />
            </ConfigItem>
            {needPassword && (
              <ConfigItem title="密码">
                <PropertyEditor
                  name="password"
                  initValue={password}
                  binding={setPassword}
                />
              </ConfigItem>
            )}
          </List>
        </PaperSection>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 5 }}>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ color: 'white' }}
          >
            保存修改
          </Button>
        </Box>
      </Box>
    );
  return null;
};

export default SettingsPage;
