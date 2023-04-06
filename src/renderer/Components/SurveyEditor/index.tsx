import React, { useCallback, useEffect, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model, IElement, PanelModel, Question } from 'survey-core';
import { Box } from '@mui/material';
import EditPanel, { ISegment } from '../EditPanel';

interface IProps {
  data: Model;
}

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        mt: 2,
        position: 'relative',
      }}
    >
      <Survey model={model} mode="display" />
    </Box>
  );
};
export default SurveyEditor;
