import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { Question } from 'survey-core';
import QuestionEditor from '../QuestionEditor';

interface IProps {
  data: Question;
  open: boolean;
  onClose: () => void;
}

const QuestionEditModal: React.FC<IProps> = ({ open, data, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>编辑问题</DialogTitle>
    </Dialog>
  );
};

export default QuestionEditModal;
