import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model, IElement, Question, PanelModel } from 'survey-core';
import { Box } from '@mui/material';
import ReactDOM from 'react-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ConfirmProvider } from 'material-ui-confirm';
import { theme } from 'renderer/App';
import QuestionEditPanel from '../QuestionEditPanel';
import GroupEditPanel from '../GroupEditPanel';

interface IProps {
  model: Model;
  onUpdate: () => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (element: IElement) => void;
}

interface IContainer {
  dom: HTMLDivElement;
  element: IElement;
  rendered: boolean;
}

const clearContainers = (
  containers: IContainer[],
  onAfterClear?: () => void
) => {
  containers.forEach((container) => {
    ReactDOM.unmountComponentAtNode(container.dom);
  });
  onAfterClear?.();
};

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ model, onUpdate, onDelete }) => {
  const [questions, setQuestions] = useState<IContainer[]>([]);
  const [panels, setPanels] = useState<IContainer[]>([]);

  const addQuestion = (data: IContainer) => {
    setQuestions((prev) => [...prev, data]);
  };
  const addPanel = (data: IContainer) => {
    setPanels((prev) => [...prev, data]);
  };

  const handleRenderQuestion = useCallback((sender: Model, options: any) => {
    console.log(`Hacking Button: ${options.htmlElement.id}`);
    const container = document.createElement('div');
    container.className = 'btn-container'; // 这个样式定义在App.css里
    const header = options.htmlElement;
    header.appendChild(container);
    addQuestion({
      dom: container,
      element: options.question,
      rendered: false,
    });
  }, []);

  const handleRenderPanel = useCallback((sender: Model, options: any) => {
    console.log(`Hacking Panel: ${options.htmlElement.id}`);
    const container = document.createElement('div');
    container.style.width = 'auto';
    container.className = 'panel-edit'; // 这个样式定义在App.css里

    const dom = options.htmlElement as HTMLElement;
    // 当Panel没有标题时，插入到第一个元素前
    if (dom.childElementCount < 2) dom.insertBefore(container, dom.firstChild);
    else {
      const title = (options.htmlElement as HTMLElement)
        .firstElementChild as HTMLElement;
      if (!title) return;

      title.appendChild(container);
    }

    addPanel({
      dom: container,
      element: options.panel,
      rendered: false,
    });
  }, []);

  // Hook: 渲染操作按钮到问题元素内
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < questions.length; i++) {
      // eslint-disable-next-line no-continue
      if (questions[i].rendered) continue;
      console.log(`Render buttons in Question[${questions[i].element.name}]`);
      const container = questions[i];
      const { dom, element: question } = container;
      const deleteQuestionHanlder = () => onDelete(question);
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <QuestionEditPanel
              data={question as Question}
              onUpdate={onUpdate}
              onDelete={deleteQuestionHanlder}
            />
          </ConfirmProvider>
        </ThemeProvider>,
        dom
      );
      container.rendered = true;
    }
  }, [questions, onDelete, onUpdate]);

  // Hook: 渲染操作按钮到面板元素内
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < panels.length; i++) {
      // eslint-disable-next-line no-continue
      if (panels[i].rendered) continue;
      const container = panels[i];
      const { dom, element: panel } = container;
      console.log(`Render buttons in Panel[${panel.name}]`);
      const deletePanelHanlder = () => onDelete(panel);
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <GroupEditPanel />
          </ConfirmProvider>
        </ThemeProvider>,
        dom
      );
      container.rendered = true;
    }
  }, [panels, onDelete, onUpdate]);

  // Hook: 在页面卸载时清空所有Container
  useEffect(
    () => () => {
      console.log(`Unmounting SurveyEditor and delete all containers`);
      clearContainers(questions, () => setQuestions([]));
      clearContainers(panels, () => setPanels([]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [model.currentPageNo]
  );

  const surveyDisplay = useMemo(() => {
    model.showProgressBar = 'bottom';
    return (
      model && (
        <Survey
          onAfterRenderQuestion={handleRenderQuestion}
          onAfterRenderPanel={handleRenderPanel}
          model={model}
          mode="display"
        />
      )
    );
  }, [model, handleRenderQuestion, handleRenderPanel]);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {surveyDisplay}
    </Box>
  );
};
export default SurveyEditor;
