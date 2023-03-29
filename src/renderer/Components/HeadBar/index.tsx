import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes, SurveyListContext } from 'renderer/App';
import { Typography } from '@mui/material';
import TopIconButton from './TopIconButton';
import styles from './styles.module.scss';

function getUrlFirstPart(url: string) {
  return url.slice(1).indexOf('/') > 0
    ? url.slice(0, url.slice(1).indexOf('/') + 1)
    : url;
}

function HeadBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const { data: surveyList, refreshHandler: handleRefresh } =
    useContext(SurveyListContext);

  const [title, setTitle] = useState('心理测评系统');

  useEffect(() => {
    console.log(loc.pathname);
    const pathname = getUrlFirstPart(loc.pathname);
    if (pathname === '') setTitle('心理测评系统');
    console.log(pathname);

    for (let i = 0; i < routes.length; i += 1) {
      if (getUrlFirstPart(routes[i].path) === pathname) {
        let titleTmp = routes[i].title;
        if (pathname === '/survey' && surveyList) {
          const surveyId = loc.pathname.split('/')[2];
          const survey = surveyList.find((s) => s.id === surveyId);
          if (survey) titleTmp += ` - ${survey.name}`;
        } else if (pathname === '/results' && surveyList) {
          const surveyId = loc.pathname.split('/')[2];
          const survey = surveyList.find((s) => s.id === surveyId);
          if (survey) titleTmp += ` - ${survey.name}`;
        }
        setTitle(titleTmp);
        break;
      }
    }
  }, [loc, loc.pathname, surveyList]);

  const handleBack = () => {
    nav(-1);
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
            <TopIconButton
              onClick={handleBack}
              disabled={loc.key === 'default'}
            >
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
