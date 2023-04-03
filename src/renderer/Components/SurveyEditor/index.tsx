import React, { useCallback, useEffect, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { Box } from '@mui/material';
import EditPanel, { ISegment } from '../EditPanel';

interface IProps {
  data: Model;
}

const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  const [poses, setPoses] = useState<ISegment[]>([]);
  console.log(model.getAllQuestions().map((item) => item.id));

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
      console.log(`${options.question.name} rendered`);
      const rect = options.htmlElement.getBoundingClientRect();
      const pos: ISegment = {
        qHeight: rect.height,
        data: options.question,
      };
      addToPoses(pos);
    }, [])
  );
  model.onAfterRenderPanel.add(
    useCallback((sender, options) => {
      console.log(`${options.panel.name} rendered`);
      addToPoses({ qHeight: 87, data: options.panel });
      options.panel.questions.forEach((question) => {
        console.log(question.isVisible);
      });
    }, [])
  );

  model.onPanelVisibleChanged.add(
    useCallback((sender, options) => {
      const panelChildren = options.panel.questions;
      console.log(`Visible changed: ${options.panel.name}`);
      panelChildren.forEach((question) => {
        poses.find((p) => p.data.name === question.name)?.data.collapse();
      });
    }, [])
  );

  model.onAfterRenderSurvey.add(() => {
    console.log('Survey rendered');
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
