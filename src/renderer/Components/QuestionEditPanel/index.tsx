import React, { useState } from 'react';
import { Box, Tooltip, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Question } from 'survey-core';
import Typography from '@mui/material/Typography';
import { useConfirm } from 'material-ui-confirm';
import { getQuestionTypeCn } from './typing';
import QuestionEditModal from '../QuestionEditModal';

const tooltipText = (q: Question) => (
  <>
    <Typography>
      <i>ID：</i>
      {q.id}
    </Typography>
    <Typography>
      <i>问题类型：</i>
      {getQuestionTypeCn(q)}
    </Typography>
    <Typography>
      <i>标识符：</i>
      {q.name}
    </Typography>

    {q.isRequired && (
      <Typography>
        <b>*必填选项</b>
      </Typography>
    )}
  </>
);

interface IProps {
  data: Question;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const QuestionEditPanel: React.FC<IProps> = ({ data, onUpdate, onDelete }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const confirm = useConfirm();

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    confirm({
      title: '删除问题',
      description: `你确定要删除该问题吗？这是不可恢复的！`,
      confirmationButtonProps: { variant: 'contained', color: 'error' },
      cancellationText: '取消',
      confirmationText: '清除',
    })
      .then(() => {
        console.log(`Delete: ${data.name}`);
        onDelete?.();
        return null;
      })
      .catch(() => console.log('Delete Canceld'));
  };

  const handleModalClose = () => setEditModalOpen(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0e826b', color: '#0e826b' }}
          onClick={handleEdit}
          startIcon={<ModeEditIcon />}
        >
          编辑
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ ml: 1.5 }}
          startIcon={<DeleteForeverIcon />}
        >
          删除
        </Button>
      </Box>
      <Tooltip title={tooltipText(data)} placement="left-end">
        <InfoOutlinedIcon color={data.isRequired ? 'success' : 'inherit'} />
      </Tooltip>
      <QuestionEditModal
        open={editModalOpen}
        data={data}
        onClose={handleModalClose}
        onSave={onUpdate}
      />
    </Box>
  );
};

export default QuestionEditPanel;
