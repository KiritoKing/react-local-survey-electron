import { ListItem, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const ConfigItem: React.FC<IProps> = ({ title, children }) => {
  return (
    <ListItem sx={{ display: 'flex', mb: 2 }}>
      <Typography sx={{ mr: 2, minWidth: '6rem' }}>{title}</Typography>
      {children}
    </ListItem>
  );
};

export default ConfigItem;
