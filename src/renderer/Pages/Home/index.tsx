/* eslint-disable no-console */
import { ISurvey, ISurveyCache } from 'main/typing';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { SurveyListContext } from 'renderer/App';
import SurveyList from 'renderer/Components/SurveyList';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CreateSuveyModal from 'renderer/Components/CreateSurveyModal';
import { Model } from 'survey-core';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

function Home() {
  const nav = useNavigate();
  const dataContext = useContext(SurveyListContext) as any;
  const surveyCache = dataContext.data as ISurveyCache[];
  const refreshSurveys = useContext(SurveyListContext).refreshHandler;
  const { enqueueSnackbar } = useSnackbar();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => setDialogOpen(false);

  const handleFail = () => {
    enqueueSnackbar('问卷数据加载失败，请刷新后重试', { variant: 'error' });
  };

  const handleCreate = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (name: string) => {
    const newSurvey: ISurvey = {
      id: uuid(),
      name,
      lastModified: dayjs().valueOf(),
      creator: 'none',
      data: new Model().toJSON(),
    };
    console.log(newSurvey);
    window.electron.ipcRenderer.sendMessage('save-survey', [newSurvey]);
    refreshSurveys();
    nav(`/editor/${newSurvey.id}`);
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
      <CreateSuveyModal
        open={dialogOpen}
        close={handleCloseDialog}
        setResult={handleSubmit}
      />
    </Box>
  );
}

export default Home;
