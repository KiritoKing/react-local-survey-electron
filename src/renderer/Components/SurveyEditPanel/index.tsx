import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { useMemo, useState } from 'react';
import { Model } from 'survey-core';
import useDeleteConfirm from 'renderer/Hooks/useDeleteConfirm';
import AddingModal from '../AddingModal';
import GroupEditModal from '../GroupEditModal';

export type ElementType = 'question' | 'panel' | 'page';

interface IProps {
  data?: Model;
  onChange?: () => void;
}

const SurveyEditPanel: React.FC<IProps> = ({ onChange, data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addType, setAddType] = useState<ElementType>();
  const menuOpen = Boolean(anchorEl);
  const [addingModalOpen, setAddingModalOpen] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const confirm = useDeleteConfirm();

  const raiseAddingModal = (type: ElementType) => {
    setAddType(type);
    setAddingModalOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (type: ElementType) => {
    if (data === undefined) return;
    console.log(`Adding a ${type}`);
    raiseAddingModal(type);
    handleMenuClose();
  };

  const handleEdit = () => {
    setEditingModalOpen(true);
  };

  const handleDelete = () => {
    if (data === undefined) return;
    confirm()
      .then(() => {
        data.removePage(data.currentPage);
        onChange?.();
        return true;
      })
      .catch(() => console.log('Cancel deletion'));
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5,
        flexDirection: 'column',
      }}
    >
      <Box>
        <Button
          color="success"
          onClick={handleMenuOpen}
          variant="outlined"
          sx={{ width: '7rem' }}
        >
          添加组件
        </Button>
        <Button
          color="success"
          variant="outlined"
          sx={{ ml: 4, width: '7rem' }}
          onClick={handleEdit}
        >
          编辑页面
        </Button>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          sx={{ ml: 4, width: '7rem' }}
        >
          删除当前页
        </Button>
      </Box>
      <Menu
        id="add-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAdd('question')}>
          <HelpIcon fontSize="small" sx={{ mr: 1 }} />
          问题 Question
        </MenuItem>
        <MenuItem onClick={() => handleAdd('panel')}>
          <WorkspacesIcon fontSize="small" sx={{ mr: 1 }} />
          分组 Panel
        </MenuItem>
        <MenuItem onClick={() => handleAdd('page')}>
          <PostAddIcon fontSize="small" sx={{ mr: 1 }} />
          分页 Page
        </MenuItem>
      </Menu>
      {addingModalOpen && (
        <AddingModal
          survey={data}
          mode={addType}
          open={addingModalOpen}
          setOpen={setAddingModalOpen}
          onSave={onChange}
        />
      )}
      {editingModalOpen && (
        <GroupEditModal
          data={data?.currentPage}
          open={editingModalOpen}
          onClose={() => setEditingModalOpen(false)}
          onSave={onChange}
          element="page"
        />
      )}
    </Box>
  );
};

export default SurveyEditPanel;
