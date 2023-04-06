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

  const [surveyName, setSurveyName] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [data, setData] = useState<Model>();

  useEffect(() => {
    if (survey !== undefined) {
      setSurveyName(survey.name);
      setAuthor(survey.creator);
      setData(new Model(survey.data));
    }
  }, [survey]);

  const handleSave = useCallback(() => {
    if (survey === undefined) return;
    survey.name = surveyName ?? survey.name;
    survey.creator = author;
    survey.data = JSON.stringify(data);
    survey.lastModified = dayjs().valueOf();
    console.log(survey);
    window.electron.ipcRenderer.sendMessage('save-survey', [survey]);
    enqueueSnackbar('保存成功', { variant: 'success' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [survey, surveyName, author, data]);

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
        <MetaEditor data={survey} />
        <SurveyEditor data={data} />
      </Box>
    );
  }, []);

  return page;
}

export default EditorPage;
