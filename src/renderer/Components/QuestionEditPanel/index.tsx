import React from 'react';
import { Box, Tooltip, Button, SxProps } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Model, IElement, PanelModel, Question } from 'survey-core';

const QuestionEditPanel: React.FC<{ data: Question }> = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0e826b', color: '#0e826b' }}
          startIcon={<ModeEditIcon />}
        >
          编辑
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ ml: 1.5 }}
          startIcon={<DeleteForeverIcon />}
        >
          删除
        </Button>
      </Box>
      <Tooltip title={data.id}>
        <InfoOutlinedIcon />
      </Tooltip>
    </Box>
  );
};

export default QuestionEditPanel;
