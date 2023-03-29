/* eslint-disable no-console */
import { ISurveyCache } from 'main/typing';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { SurveyListContext } from 'renderer/App';
import SurveyList from 'renderer/Components/SurveyList';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function Home() {
  const nav = useNavigate();
  const dataContext = useContext(SurveyListContext) as any;
  const surveyCache = dataContext.data as ISurveyCache[];
  const { enqueueSnackbar } = useSnackbar();

  const handleFail = () => {
    enqueueSnackbar('问卷数据加载失败，请刷新后重试', { variant: 'error' });
  };

  const handleCreate = () => {
    nav('/editor');
  };

  return (
    <Box sx={{ minHeight: '90vh', position: 'relative' }}>
      <SurveyList data={surveyCache} onFail={handleFail} />
      <Fab
        onClick={handleCreate}
        color="primary"
        sx={{ position: 'absolute', right: '20px', bottom: '20px' }}
        aria-label="add"
      >
        <AddIcon sx={{ color: 'white' }} />
      </Fab>
    </Box>
  );
}

export default Home;
