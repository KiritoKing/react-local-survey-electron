/* eslint-disable react/require-default-props */
import React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

interface IProps extends MenuProps {
  onEdit?: any;
  onDelete?: any;
  onViewResults?: any;
}

// eslint-disable-next-line react/function-component-definition
const SurveyListItemMenu: React.FC<IProps> = ({
  onEdit,
  onDelete,
  onViewResults,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Menu {...props}>
      <MenuItem onClick={onEdit}>
        <EditIcon fontSize="small" />
        <ListItemText sx={{ ml: 1, color: '#454c4f' }}>编辑</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <DeleteIcon fontSize="small" />
        <ListItemText sx={{ ml: 1, color: '#454c4f' }}>删除</ListItemText>
      </MenuItem>
      <MenuItem onClick={onViewResults}>
        <AssignmentTurnedInIcon fontSize="small" />
        <ListItemText sx={{ ml: 1, color: '#454c4f' }}>管理结果</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default SurveyListItemMenu;
