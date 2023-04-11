import { Paper, SxProps, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title?: string;
  sx?: SxProps;
  children?: React.ReactNode;
}

const PaperSection: React.FC<IProps> = ({ title, sx, children }) => {
  return (
    <Paper elevation={3} sx={sx}>
      {title && (
        <Typography variant="h5" marginBottom={3}>
          <b>{title}</b>
        </Typography>
      )}
      {children}
    </Paper>
  );
};

export default PaperSection;
