import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorInfo: React.FC<{
  message?: string;
  children?: string;
}> = ({ message, children }) => {
  return (
    <Box
      sx={{
        mt: '10rem',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: 'bold', color: '#262626' }}
      >
        {message}
        {children}
      </Typography>
    </Box>
  );
};

export default ErrorInfo;
