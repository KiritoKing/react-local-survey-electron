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

export type ElementType = 'question' | 'panel' | 'page';

interface IProps {
  data?: Model;
  onChange?: () => void;
}

const SurveyEditPanel: React.FC<IProps> = ({ onChange, data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addType, setAddType] = useState<ElementType>();
  const menuOpen = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const confirm = useDeleteConfirm();

  const raiseAddingModal = (type: ElementType) => {
    setAddType(type);
    setModalOpen(true);
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

  // 新建问题用的Modal
  const modal = useMemo(
    () => (
      <AddingModal
        survey={data}
        mode={addType}
        open={modalOpen}
        setOpen={setModalOpen}
        onSave={onChange}
      />
    ),
    [addType, data, modalOpen, onChange]
  );

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
      {modal}
    </Box>
  );
};

export default SurveyEditPanel;
