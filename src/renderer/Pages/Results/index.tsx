import { Button, ButtonProps } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import { IResultCache } from 'main/typing';
import React, { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultList from 'renderer/Components/ResultList';
import { SurveyListContext } from 'renderer/App';
import styles from './styles.module.scss';

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    color="secondary"
    variant="outlined"
    sx={{ margin: '0.4rem' }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </Button>
);

const ResultPage = () => {
  const { surveyId } = useParams();
  const surveys = useContext(SurveyListContext).data;
  const [data, setData] = React.useState<IResultCache[]>([]);

  const handleRefresh = useCallback(() => {
    window.electron.ipcRenderer
      .invoke('get-result', surveyId)
      .then((res) => {
        setData(res);
        return res;
      })
      .catch(console.log);
  }, [surveyId]);

  const handleExport = () => {
    const name =
      surveys?.find((item) => item.id === surveyId)?.name ?? 'untitled';
    window.electron.ipcRenderer.sendMessage('export-result', [surveyId, name]);
  };

  const handleClear = () => {
    window.electron.ipcRenderer.sendMessage('clear-result', [surveyId]);
    handleRefresh();
  };

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh, surveyId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles['top-panel']}>
        <CustomButton onClick={handleRefresh} startIcon={<RefreshIcon />}>
          刷新
        </CustomButton>
        <CustomButton onClick={handleExport} startIcon={<IosShareIcon />}>
          导出
        </CustomButton>
        <CustomButton onClick={handleClear} startIcon={<DeleteForeverIcon />}>
          清空
        </CustomButton>
      </div>
      {data ? (
        <CircularProgress sx={{ mt: '8rem' }} color="success" />
      ) : (
        <ResultList data={data!} />
      )}
    </div>
  );
};
export default ResultPage;
