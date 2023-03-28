import Button, { ButtonProps } from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IResultCache } from 'main/typing';
import React, { useCallback } from 'react';

interface IProps {
  data: IResultCache[];
  handleRefresh: () => void;
}

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

const ResultControlPanel: React.FC<IProps> = ({ handleRefresh, data }) => {
  const handleExport = () => {
    const name = data.find((item) => item.id === surveyId)?.name ?? 'untitled';
    window.electron.ipcRenderer.sendMessage('export-result', [surveyId, name]);
  };

  const handleClear = () => {
    window.electron.ipcRenderer.sendMessage('clear-result', [surveyId]);
    handleRefresh();
  };

  return <div>ResultControlPanel</div>;
};

export default ResultControlPanel;
