/* eslint-disable react/require-default-props */
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeadBar from '../HeadBar';
import styles from './styles.module.scss';

// eslint-disable-next-line react/function-component-definition
const PageFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <HeadBar />
      <div className={styles.content}>
        <Outlet />
      </div>
      {children}
    </div>
  );
};

export default PageFrame;
