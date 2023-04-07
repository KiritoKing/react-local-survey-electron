import { Box, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorInfo from 'renderer/Components/ErrorInfo';
import useSurvey from 'renderer/Hooks/useSurvey';
import { Model, PanelModel, PageModel } from 'survey-core';
import SurveyEditor from 'renderer/Components/SurveyEditor';
import MetaEditor from 'renderer/Components/MetaEditor';
import SurveyEditPanel, {
  ElementType,
} from 'renderer/Components/SurveyEditPanel';

function EditorPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);

  const [data, setData] = useState<Model>();

  const handleRefreshSurvey = useCallback(() => {
    enqueueSnackbar('问题保存成功', { preventDuplicate: true });
    setData(data);
  }, [data, enqueueSnackbar]);

  useEffect(() => {
    if (survey !== undefined) {
      console.log('survey in Editor Updated');
      const model = new Model(survey.data);
      model.locale = 'zh-cn';
      setData(model);
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
      enqueueSnackbar('问卷保存成功', { variant: 'success' });
    },
    [survey, data, enqueueSnackbar]
  );

  const handleDeleteQuestion = useCallback(
    (name: string) => {
      if (survey && data) {
        const model = data;
        const question = model.getQuestionByName(name);
        if (question === undefined) return;
        const { parent } = question;
        parent.removeElement(question);
        setData(model);
      }
    },
    [data, survey]
  );

  const handleAdd = useCallback(
    (type: ElementType) => {
      setData(data);
    },
    [data]
  );

  const handleDeletePage = useCallback(() => {}, []);

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
        <SurveyEditPanel onChange={handleAdd} deletePage={handleDeletePage} />
        <SurveyEditor
          model={data}
          onUpdate={handleRefreshSurvey}
          onDelete={handleDeleteQuestion}
        />
      </Box>
    );
  }, [
    survey,
    data,
    handleSave,
    handleAdd,
    handleDeletePage,
    handleRefreshSurvey,
    handleDeleteQuestion,
  ]);

  return page;
}

export default EditorPage;
