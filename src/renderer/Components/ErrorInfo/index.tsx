/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorInfo: React.FC<{
  message?: string;
  children?: string;
  enableBack?: boolean;
  mt?: string;
}> = ({ message, children, enableBack, mt }) => {
  return (
    <Box
      sx={{
        mt: mt ?? '10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: 'bold', color: '#262626', mb: 5 }}
      >
        {message}
        {children}
      </Typography>
      {enableBack === true ? <Link to="/">返回主页</Link> : <></>}
    </Box>
  );
};

export default ErrorInfo;
