import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { SurveyListContext } from 'renderer/App';
import TopIconButton from './TopIconButton';
import styles from './styles.module.scss';

function HeadBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const dataContext = useContext(SurveyListContext) as any;
  const handleRefresh = dataContext.refreshHandler as () => void;

  const handleBack = () => {
    nav(-1);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.titleBar}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <TopIconButton
              onClick={handleBack}
              disabled={loc.key === 'default'}
            >
              <ArrowBackIosNewIcon />
            </TopIconButton>
          </Box>
          <TopIconButton onClick={handleRefresh}>
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
