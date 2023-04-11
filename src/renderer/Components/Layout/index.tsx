/* eslint-disable react/require-default-props */
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useConfirm } from 'material-ui-confirm';
import HeadBar from '../HeadBar';
import styles from './styles.module.scss';
import { routes } from '../../App';

interface IContentModifyContext {
  modified: () => void;
  saved: () => void;
}

export const ContentModifyContext = React.createContext<IContentModifyContext>({
  modified: () => {},
  saved: () => {},
});

// eslint-disable-next-line react/function-component-definition
const Layout: React.FC = () => {
  const loc = useLocation();
  const currentOutlet = useOutlet();
  const [modified, setModified] = React.useState(false);
  const modifiedFunc = React.useCallback(() => setModified(true), []);
  const savedFunc = React.useCallback(() => setModified(false), []);
  const confirm = useConfirm();

  const contextValue = React.useMemo(
    () => ({ modified: modifiedFunc, saved: savedFunc }),
    [modifiedFunc, savedFunc]
  );

  const handlePageChange = React.useCallback(async () => {
    if (modified) {
      const confirmResult = await confirm({
        title: '离开确认',
        description:
          '您的更改尚未保存，离开此页面将丢失所有更改，您确定要离开吗？',
        confirmationText: '确认',
        cancellationText: '取消',
      })
        .then(() => {
          setModified(false);
          return true;
        })
        .catch(() => false);
      return confirmResult;
    }
    return true;
  }, [confirm, modified]);

  const { nodeRef } = routes.find((route) => route.path === loc.pathname) ?? {};
  return (
    <div className={styles.wrapper}>
      <ContentModifyContext.Provider value={contextValue}>
        <HeadBar onPageChange={handlePageChange} />
        <div className={styles.content}>
          <SwitchTransition>
            <CSSTransition
              key={loc.pathname}
              timeout={300}
              classNames="fade"
              nodeRef={nodeRef}
              unmountOnExit
            >
              {(state: any) => (
                <div ref={nodeRef} className={state}>
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </ContentModifyContext.Provider>
    </div>
  );
};

export default Layout;
