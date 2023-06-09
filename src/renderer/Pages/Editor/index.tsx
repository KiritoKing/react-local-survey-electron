import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorInfo from 'renderer/Components/ErrorInfo';
import useSurvey from 'renderer/Hooks/useSurvey';
import { Model, PanelModel, PageModel, IElement } from 'survey-core';
import SurveyEditor from 'renderer/Components/SurveyEditor';
import MetaEditor from 'renderer/Components/MetaEditor';
import SurveyEditPanel from 'renderer/Components/SurveyEditPanel';
import useModifiedStatus from 'renderer/Hooks/useModifiedStatus';

function EditorPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);
  const [modified, saved] = useModifiedStatus();

  const [data, setData] = useState<Model>();

  const handleRefreshSurvey = useCallback(() => {
    modified();
    enqueueSnackbar('应用改动成功（未保存到文件）', { preventDuplicate: true });
    setData(data);
  }, [data, enqueueSnackbar, modified]);

  useEffect(() => {
    if (survey !== undefined) {
      console.log('[Editor Page] Survey is updated by hook');
      const model = new Model(survey.data);
      model.locale = 'zh-cn';
      setData(model);
    }
  }, [survey]);

  const clearEmptyGroups = useCallback((model?: Model) => {
    if (model === undefined) return;
    const pagesToDel: PageModel[] = [];
    model.pages.forEach((page: PageModel) => {
      console.log(`Page ${page.name} has ${page.elements.length} elements`);
      page.elements.forEach((element) => {
        if (element.isPanel && (element as PanelModel).elements.length === 0) {
          console.log(`Deleting empty panel ${element.name}`);
          page.removeElement(element);
        }
      });
      if (page.elements.length === 0) pagesToDel.push(page);
    });
    console.log(`Deleting ${pagesToDel.length} empty pages`);
    pagesToDel.forEach((page) => {
      model.removePage(page);
    });
  }, []);

  const handleSave = useCallback(
    (name: string, author: string) => {
      if (survey === undefined) return; // 如果没有读取到数据，就拒绝保存
      survey.name = name;
      survey.creator = author;
      clearEmptyGroups(data); // 清理空组
      survey.data = JSON.stringify(data);
      survey.lastModified = dayjs().valueOf();
      window.electron.ipcRenderer.sendMessage('save-survey', [survey]);
      enqueueSnackbar('问卷保存成功', { variant: 'success' });
      saved();
    },
    [survey, clearEmptyGroups, data, enqueueSnackbar, saved]
  );

  const handleDeleteElement = useCallback(
    (element: IElement) => {
      if (survey && data) {
        const model = data;
        const { parent } = element;
        if (parent === null) return;
        parent.removeElement(element);
        setData(model);
      }
    },
    [data, survey]
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
        <SurveyEditPanel data={data} onChange={handleRefreshSurvey} />
        <SurveyEditor
          model={data}
          onUpdate={handleRefreshSurvey}
          onDelete={handleDeleteElement}
        />
      </Box>
    );
  }, [survey, data, handleSave, handleRefreshSurvey, handleDeleteElement]);

  return page;
}

export default EditorPage;
