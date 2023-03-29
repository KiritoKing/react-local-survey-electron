import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { SurveyListContext } from 'renderer/App';
import { Typography } from '@mui/material';
import useTitle from 'renderer/Hooks/useTitle';
import { useSnackbar } from 'notistack';
import TopIconButton from './TopIconButton';
import styles from './styles.module.scss';

function HeadBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { refreshHandler } = useContext(SurveyListContext);

  const title = useTitle(loc.pathname);

  const handleBack = () => {
    nav('/');
  };

  const handleRefresh = () => {
    refreshHandler();
    enqueueSnackbar('成功读取文件刷新列表', {
      variant: 'success',
      preventDuplicate: true,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.titleBar}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <TopIconButton onClick={handleBack} disabled={loc.pathname === '/'}>
              <ArrowBackIosNewIcon />
            </TopIconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: 'white', textShadow: '1px 1px 5px black' }}
            >
              {title}
            </Typography>
          </Box>
          <TopIconButton
            onClick={handleRefresh}
            disabled={loc.pathname !== '/'}
          >
            <RefreshIcon />
          </TopIconButton>
          <TopIconButton>
            <SettingsIcon />
          </TopIconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeadBar;
