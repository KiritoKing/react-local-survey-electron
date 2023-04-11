import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react';

const GroupEditPanel = () => {
  return (
    <Box>
      <Tooltip title="添加问题">
        <IconButton>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="编辑面板">
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="删除面板">
        <IconButton color="error">
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default GroupEditPanel;
