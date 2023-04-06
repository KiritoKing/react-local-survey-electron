import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model, IElement, PanelModel, Question } from 'survey-core';
import { Box, createTheme } from '@mui/material';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button/Button';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import EditPanel, { ISegment } from '../EditPanel';
import QuestionEditPanel from '../QuestionEditPanel';

interface IProps {
  model: Model;
}

interface IContainer {
  dom: HTMLDivElement;
  question: Question;
  rendered: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#19b394',
    },
    secondary: {
      main: '#0e6150',
    },
  },
});

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ model }) => {
  const [containers, setContainers] = useState<IContainer[]>([]);
  const addContainer = (data: IContainer) => {
    setContainers((prev) => [...prev, data]);
  };

  const renderHacker = useCallback((sender: Model, options: any) => {
    console.log(`HtmlElement: ${options.htmlElement.id}}`);
    const container = document.createElement('div');
    container.className = 'btn-container'; // 这个样式定义在App.css里
    const header = options.htmlElement;
    header.appendChild(container);
    addContainer({
      dom: container,
      question: options.question,
      rendered: false,
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < containers.length; i++) {
      // eslint-disable-next-line no-continue
      if (containers[i].rendered) continue;
      console.log(`Render button: ${containers[i].question.name}`);
      const container = containers[i];
      const { dom, question } = container;
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <QuestionEditPanel data={question} />
        </ThemeProvider>,
        dom
      );
      container.rendered = true;
    }
  }, [containers]);

  // 在页面卸载时清空Container
  useEffect(
    () => () => {
      console.log(`Unmounting SurveyEditor and delete all containers`);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        ReactDOM.unmountComponentAtNode(container.dom);
      }
      setContainers([]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [model.currentPageNo]
  );

  const surveyDisplay = useMemo(() => {
    return (
      model && (
        <Survey
          onAfterRenderQuestion={renderHacker}
          model={model}
          mode="display"
        />
      )
    );
  }, [model, renderHacker]);

  return (
    <Box
      sx={{
        display: 'flex',
        mt: 2,
        position: 'relative',
      }}
    >
      {surveyDisplay}
    </Box>
  );
};
export default SurveyEditor;
