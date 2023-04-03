import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorInfo from 'renderer/Components/ErrorInfo';
import useSurvey from 'renderer/Hooks/useSurvey';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import SurveyEditor from 'renderer/Components/SurveyEditor';

function EditorPage() {
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);
  const [surveyName, setSurveyName] = useState(survey?.name);
  const [author, setAuthor] = useState(survey?.creator);
  const [data, setData] = useState(new Model(survey?.data));
  const { enqueueSnackbar } = useSnackbar();

  const surveyEditorMemo = useMemo(() => <SurveyEditor data={data} />, [data]);

  const handleSave = () => {
    if (survey === undefined) return;
    survey.name = surveyName ?? survey.name;
    survey.creator = author;
    survey.data = JSON.stringify(data);
    survey.lastModified = dayjs().valueOf();
    console.log(survey);
    window.electron.ipcRenderer.sendMessage('save-survey', [survey]);
    enqueueSnackbar('保存成功', { variant: 'success' });
  };

  if (survey === undefined) {
    return <ErrorInfo message="未能读取到数据" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '1rem',
      }}
    >
      <Paper sx={{ padding: '3rem 3rem' }} elevation={3}>
        <Typography variant="h5" marginBottom={3}>
          <b>元数据修改</b>
        </Typography>
        <TextField
          id="name"
          label="问卷名"
          fullWidth
          type="text"
          value={surveyName}
          sx={{ marginBottom: '2rem' }}
          onChange={(e) => setSurveyName(e.target.value)}
        />
        <TextField
          id="author"
          label="作者"
          fullWidth
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            marginTop: '1.5rem',
            padding: '1rem',
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ color: 'white' }}
          >
            保存全部更改
          </Button>
        </Box>
      </Paper>
      {surveyEditorMemo}
    </Box>
  );
}

export default EditorPage;
