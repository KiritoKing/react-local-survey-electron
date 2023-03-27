/* eslint-disable react/require-default-props */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './PageFrame.module.scss';

interface IPropButton {
  children?: React.ReactNode;
  onClick?: () => void;
}

function TopIconButton({ children, ...props }: IPropButton) {
  return (
    <IconButton
      size="large"
      edge="start"
      aria-label="menu"
      sx={{ mr: 2, color: 'white' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </IconButton>
  );
}

// eslint-disable-next-line react/function-component-definition
const PageFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const nav = useNavigate();

  const handleBack = () => {
    nav(-1);
  };
  const handleForward = () => {
    nav(1);
  };

  return (
    <div className={styles.wrapper}>
      <Box sx={{ flexGrow: 1 }} className={styles.titleBar}>
        <AppBar position="fixed">
          <Toolbar>
            <TopIconButton onClick={handleBack}>
              <ArrowBackIosNewIcon />
            </TopIconButton>
            <TopIconButton onClick={handleForward}>
              <ArrowForwardIosIcon />
            </TopIconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles.content}>
        <Outlet />
      </div>
      {children}
    </div>
  );
};

export default PageFrame;
