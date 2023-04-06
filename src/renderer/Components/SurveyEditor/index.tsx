import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model, IElement, PanelModel, Question } from 'survey-core';
import { Box } from '@mui/material';
import EditPanel, { ISegment } from '../EditPanel';

interface IProps {
  data: Model;
}

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  const renderHacker = useCallback((sender: Model, options: any) => {
    console.log(`onAfterRenderQuestion: ${options.question.name}`);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dialogBox-btn';
    btn.innerHTML = 'More Info';
    let header = options.htmlElement.querySelector('h5');
    if (!header) header = options.htmlElement;
    header!.appendChild(btn);
  }, []);

  const surveyDisplay = useMemo(
    () => (
      <Survey
        onAfterRenderQuestion={renderHacker}
        model={model}
        mode="display"
      />
    ),
    [model]
  );

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
