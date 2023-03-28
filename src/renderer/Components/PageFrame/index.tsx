/* eslint-disable react/require-default-props */
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import HeadBar from '../HeadBar';
import styles from './styles.module.scss';
import { routes } from '../../App';

// eslint-disable-next-line react/function-component-definition
const PageFrame: React.FC = () => {
  const loc = useLocation();
  const { nodeRef } = routes.find((route) => route.path === loc.pathname) ?? {};
  return (
    <div className={styles.wrapper}>
      <HeadBar />
      <div className={styles.content}>
        <SwitchTransition>
          <CSSTransition
            key={loc.pathname}
            timeout={500}
            classNames="fade"
            nodeRef={nodeRef}
            unmountOnExit
          >
            {(state: any) => (
              <div ref={nodeRef} className={state}>
                <Outlet />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default PageFrame;
