import { Box, Button } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ISurveyElement, PanelModel, Model } from 'survey-core';

export interface ISegment {
  height: number; // Element height
  data: ISurveyElement; // Question OR Panel
}

interface IProps {
  segments?: ISegment[];
  model: Model;
}

const EditPanel: React.FC<IProps> = ({ segments, model }) => {
  const [render, setRender] = useState(segments);
  const generateButtons = () =>
    segments?.map((segment) => {
      if (segment.data.isPanel === true) {
        const panel = segment.data as PanelModel;
        return <Box sx={{ height: segment.height + 16 }} />;
      }
      return (
        <Box sx={{ height: segment.height + 16 }}>
          <Button variant="contained" sx={{ color: 'white' }}>
            Edit
          </Button>
        </Box>
      );
    });

  return (
    <Box sx={{ position: 'relative', mt: '56px' }}>{generateButtons()}</Box>
  );
};

export default EditPanel;
