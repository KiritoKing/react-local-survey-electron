import { ListItem, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const ConfigItem: React.FC<IProps> = ({ title, children, fullWidth }) => {
  return (
    <ListItem
      sx={{ display: 'flex', mb: 2, width: fullWidth ? '100%' : 'auto' }}
    >
      <Typography sx={{ mr: 2, minWidth: '6rem' }}>{title}</Typography>
      {children}
    </ListItem>
  );
};

export default ConfigItem;
