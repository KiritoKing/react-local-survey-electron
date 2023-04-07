import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title?: string;
  children?: React.ReactNode;
  last?: boolean;
}

const ModalSection: React.FC<IProps> = ({ title, children, last }) => {
  return (
    <Box sx={{ mt: 2, mb: last ? 3 : 1 }}>
      <Box sx={{ ml: 4, mr: 4 }}>
        {title && (
          <Typography sx={{ mb: 3, fontWeight: 700 }}>{title}</Typography>
        )}
        {children}
      </Box>
      {last !== true && <Divider variant="middle" sx={{ mb: 2, mt: 3 }} />}
    </Box>
  );
};

export default ModalSection;
