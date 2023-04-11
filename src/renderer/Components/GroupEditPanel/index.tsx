import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { PanelModel } from 'survey-core';
import React, { useState } from 'react';
import useDeleteConfirm from 'renderer/Hooks/useDeleteConfirm';
import GroupEditModal from '../GroupEditModal';
import QuestionEditModal from '../QuestionEditModal';

interface IProps {
  data: PanelModel;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const GroupEditPanel: React.FC<IProps> = ({ data, onUpdate, onDelete }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const confirm = useDeleteConfirm();

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleDelete = () => {
    confirm()
      .then(() => {
        console.log(`Delete: ${data.name}`);
        onDelete && onDelete();
        return true;
      })
      .catch(console.log);
  };

  return (
    <>
      <Box>
        <Tooltip onClick={handleAdd} title="添加问题">
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip onClick={handleEdit} title="编辑面板">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip onClick={handleDelete} title="删除面板">
          <IconButton color="error">
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {editModalOpen && (
        <GroupEditModal
          data={data}
          open={editModalOpen}
          element="panel"
          onClose={() => setEditModalOpen(false)}
          onSave={onUpdate}
        />
      )}
      {addModalOpen && (
        <QuestionEditModal
          container={data}
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
};

export default GroupEditPanel;
