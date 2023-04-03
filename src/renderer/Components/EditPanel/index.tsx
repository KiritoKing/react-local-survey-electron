import { Box, Button } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ISurveyElement, PanelModel, Model } from 'survey-core';

export interface ISegment {
  qHeight: number;
  data: ISurveyElement;
  hidden?: boolean;
}

interface IProps {
  segments?: ISegment[];
  model: Model;
}

const EditPanel: React.FC<IProps> = ({ segments, model, hidden }) => {
  const [render, setRender] = useState(segments);
  const removeSegments = (...toDeleted: string[]) => {
    setRender((prev) => {
      if (prev !== undefined)
        return prev.filter((p) => !toDeleted.includes(p.data.name));
      return prev;
    });
  };
  useEffect(() => {
    console.log('Clear collapsed');
    const toDeleteNames: string[] = [];
    // 找到panel，若没有展开，则删除其下所有问题
    render?.forEach((segment) => {
      if (segment.data.isPanel === true) {
        const panel = segment.data as PanelModel;
        if (panel.isExpanded === false) {
          panel.questions.forEach((question) => {
            toDeleteNames.push(question.name);
          });
        }
      }
    });
    removeSegments(...toDeleteNames);
  }, [segments, model]);

  const generateButtons = () =>
    segments?.map((segment) => {
      if (segment.data.isPanel === true) {
        const panel = segment.data as PanelModel;
        return <Box sx={{ height: segment.qHeight + 16 }} />;
      }
      return (
        <Box sx={{ height: segment.qHeight + 16 }}>
          <Button>1</Button>
          <Button>2</Button>
        </Box>
      );
    });

  return (
    <Box sx={{ position: 'relative', mt: '56px' }}>{generateButtons()}</Box>
  );
};

export default EditPanel;
