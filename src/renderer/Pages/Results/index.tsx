import { Button } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IResultCache } from 'main/typing';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultList from 'renderer/Components/ResultList';
import styles from './styles.module.scss';

const ResultPage = () => {
  const { surveyId } = useParams();
  const [data, setData] = React.useState<IResultCache[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('get-result', surveyId)
      .then((res) => {
        setData(res);
        return res;
      })
      .catch(console.log);
  }, [surveyId]);

  return (
    <div>
      <div className={styles['top-panel']}>
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<RefreshIcon />}
          sx={{ margin: '0.4rem' }}
        >
          刷新
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<IosShareIcon />}
          sx={{ margin: '0.4rem' }}
        >
          导出
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          sx={{ margin: '0.4rem' }}
        >
          清空
        </Button>
      </div>
      <ResultList data={data} />
    </div>
  );
};
export default ResultPage;
