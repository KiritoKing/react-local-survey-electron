import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { useMemo, useState } from 'react';
import { Model, PanelModel, PageModel, IPanel } from 'survey-core';
import QuestionEditModal from '../QuestionEditModal';
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

  const raiseAddingModal = (type: ElementType) => {
    setAddType(type);
    setModalOpen(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (type: ElementType) => {
    if (data === undefined) return;
    console.log(`Adding a ${type}`);
    let container: PageModel | PanelModel;

    switch (type) {
      case 'page':
        container = data.addNewPage(
          `page${data.pages.length}`,
          data.currentPageNo + 1
        );
        container.addNewQuestion(
          'text',
          '占位符：请先添加其他问题再删除本问题'
        );
        data.currentPage = container;
        console.log(`Page count: ${data.pages.length}`);
        break;
      case 'panel':
        container = data.pages[data.currentPageNo].addNewPanel(
          `panel${data.pages[data.currentPageNo].getAllPanels().length}`
        );
        container.title = 'test';
        container.addNewQuestion(
          'text',
          '占位符：请先添加其他问题再删除本问题'
        );
        break;
      case 'question':
        raiseAddingModal(type);
        break;
      default:
        console.log('Unhandled add behavior');
        break;
    }
    handleClose();
  };

  const handleDelete = () => {
    onChange?.();
    handleClose();
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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Button
        color="success"
        onClick={handleClick}
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
      <Menu
        id="add-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
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
