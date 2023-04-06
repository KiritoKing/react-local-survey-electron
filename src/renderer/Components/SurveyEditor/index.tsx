import React, { useCallback, useEffect, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { Box } from '@mui/material';
import EditPanel, { ISegment } from '../EditPanel';

interface IProps {
  data: Model;
}

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  const [poses, setPoses] = useState<ISegment[]>([]);
  console.log(model.getAllQuestions().map((item) => item.name));

  const addToPoses = (pos: ISegment) => {
    setPoses((prev) => {
      if (prev.find((p) => p.data.name === pos.data.name)) return prev;
      return [...prev, pos];
    });
  };

  model.locale = 'zh-cn';
  model.currentPage;
  model.onAfterRenderQuestion.add(
    useCallback((sender, options) => {
      console.log(`Question:${options.question.name} rendered`);
      // const rect = options.htmlElement.getBoundingClientRect();
      // const pos: ISegment = {
      //   qHeight: rect.height,
      //   data: options.question,
      // };
      // addToPoses(pos);
    }, [])
  );
  model.onAfterRenderPanel.add(
    useCallback((sender, options) => {
      console.log(`Panel:${options.panel.name} rendered`);
      console.log(
        `Panel ${options.panel.name} Expanded=${options.panel.isExpanded}`
      );
      // addToPoses({ qHeight: 87, data: options.panel });
      // options.panel.questions.forEach((question) => {
      //   console.log(question.isVisible);
      // });
    }, [])
  );

  model.onAfterRenderPage.add(
    useCallback((sender, options) => {
      console.log(`Page:${options.page.name} rendered`);
      // addToPoses({ qHeight: 87, data: options.page });
    }, [])
  );

  model.onAfterRenderSurvey.add(() => {
    console.log('Survey render completed');
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mt: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ width: '70%' }}>
        <Survey model={model} mode="display" />
      </Box>
      <EditPanel segments={poses} model={model} />
    </Box>
  );
};
export default SurveyEditor;
