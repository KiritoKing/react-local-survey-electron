import { Button } from '@mui/material';
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
        <Button
          onClick={handleRefresh}
          color="secondary"
          variant="outlined"
          startIcon={<RefreshIcon />}
          sx={{ margin: '0.4rem' }}
        >
          刷新
        </Button>
        <Button
          onClick={handleExport}
          color="secondary"
          variant="outlined"
          startIcon={<IosShareIcon />}
          sx={{ margin: '0.4rem' }}
        >
          导出
        </Button>
        <Button
          onClick={handleClear}
          color="secondary"
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          sx={{ margin: '0.4rem' }}
        >
          清空
        </Button>
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
