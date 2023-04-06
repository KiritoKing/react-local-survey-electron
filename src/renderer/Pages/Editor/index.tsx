import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorInfo from 'renderer/Components/ErrorInfo';
import useSurvey from 'renderer/Hooks/useSurvey';
import { Model } from 'survey-core';
import SurveyEditor from 'renderer/Components/SurveyEditor';
import MetaEditor from 'renderer/Components/MetaEditor';

function EditorPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);

  const [data, setData] = useState<Model>();

  useEffect(() => {
    if (survey !== undefined) {
      console.log('survey in Editor Updated');
      setData(new Model(survey.data));
    }
  }, [survey]);

  const handleSave = useCallback(
    (name: string, author: string) => {
      if (survey === undefined) return; // 如果没有读取到数据，就拒绝保存
      survey.name = name;
      survey.creator = author;
      survey.data = JSON.stringify(data);
      survey.lastModified = dayjs().valueOf();
      window.electron.ipcRenderer.sendMessage('save-survey', [survey]);
      enqueueSnackbar('保存成功', { variant: 'success' });
    },
    [survey, data, enqueueSnackbar]
  );

  const page = useMemo(() => {
    if (survey === undefined || data === undefined)
      return <ErrorInfo message="未能读取到数据，请返回刷新重试" />;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          padding: '1rem',
        }}
      >
        <MetaEditor data={survey} onSave={handleSave} />
        <SurveyEditor data={data} />
      </Box>
    );
  }, [survey, data]);

  return page;
}

export default EditorPage;
