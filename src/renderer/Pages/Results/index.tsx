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
import { useSnackbar } from 'notistack';
import useDeleteConfirm from 'renderer/Hooks/useDeleteConfirm';
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
  const [data, setData] = React.useState<IResultCache[]>(); // 默认是undefined
  const confirm = useDeleteConfirm(
    '清空所有结果',
    `你确定要清空所有结果吗？这将永久清除所有结果且不可恢复！`
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleRefresh = useCallback(() => {
    window.electron.ipcRenderer
      .invoke('get-result', surveyId)
      .then((res) => {
        if (res) setData(res);
        else setData([]);
        enqueueSnackbar('刷新成功', {
          variant: 'default',
          preventDuplicate: true,
        });
        return res;
      })
      .catch((e) => {
        console.log('e', e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  const handleExport = () => {
    const name =
      surveys?.find((item) => item.id === surveyId)?.name ?? 'untitled';
    window.electron.ipcRenderer.sendMessage('export-result', [surveyId, name]);
  };

  const handleClear = () => {
    confirm()
      .then(() => {
        console.log('Cleared');
        window.electron.ipcRenderer.sendMessage('clear-result', [surveyId]);
        handleRefresh();
        enqueueSnackbar('清空成功', { variant: 'default' });
        return null;
      })
      .catch(() => console.log('Clear Canceld'));
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

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
      {data === undefined ? (
        <CircularProgress sx={{ mt: '8rem' }} color="success" />
      ) : (
        <ResultList data={data} />
      )}
    </div>
  );
};
export default ResultPage;
