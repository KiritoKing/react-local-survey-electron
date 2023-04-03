import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  open: boolean;
  close: () => void;
  // eslint-disable-next-line no-unused-vars
  setResult?: (arg0: string) => void;
}

const CreateSuveyModal: React.FC<IProps> = ({
  open,
  close: handleClose,
  setResult,
}) => {
  const [name, setName] = useState('');
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleFinish = (str: string) => {
    if (setResult) setResult(str);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>输入问卷名</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ minWidth: '30rem' }}>
          请输入你要创建的问卷的名称：
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="问卷名"
          type="name"
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={() => handleFinish(name)}>提交</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSuveyModal;
