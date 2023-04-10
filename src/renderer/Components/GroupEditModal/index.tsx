import React, { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import { PanelModel, PageModel, Model } from 'survey-core';
import ModalSection from '../ModalSection';
import PropertyEditor from '../PropertyEditor';
import { ElementType } from '../SurveyEditPanel';

interface IProps {
  data?: PanelModel | PageModel;
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSave?: (group?: PanelModel | PageModel) => void;
  container?: PanelModel | PageModel | Model;
  element: ElementType;
  initName?: string;
}

const GroupEditModal: React.FC<IProps> = ({
  data,
  open,
  onClose,
  onSave,
  container,
  element,
  initName,
}) => {
  const [name, setName] = useState(data?.name ?? initName ?? '');
  const [title, setTitle] = useState(data?.title ?? initName ?? '');
  const elementTypeCN = useMemo(
    () => (element === 'panel' ? '分组' : '页面'),
    [element]
  );

  const handleSave = () => {
    if (data === undefined) {
      // 新建模式
      if (container === undefined) {
        console.log('[Group Edit Modal] Warning: container is undefined');
        return;
      }
      if (element === 'panel') {
        const panel: PanelModel = container.addNewPanel(name);
        panel.title = title;
        panel.addNewQuestion(
          'text',
          '占位符：请先添加其他问题再删除本问题，否则分组将被一起删除'
        );
      } else if (element === 'page') {
        const surveyModel = container as Model;
        const page = surveyModel.addNewPage(
          name,
          surveyModel.currentPageNo + 1
        );
        page.title = title;
        page.addNewQuestion(
          'text',
          '占位符：请先添加其他问题再删除本问题，否则分组将被一起删除'
        );
        surveyModel.currentPage = page;
      }
    } else {
      data.name = name;
      data.title = title;
    }
    onSave?.();
    onClose();
  };
  return (
    <Dialog onClose={onClose} open={open} sx={{ padding: 2 }} fullWidth>
      <DialogTitle>编辑{elementTypeCN}</DialogTitle>
      <ModalSection last>
        <PropertyEditor
          name="name"
          displayName={`${elementTypeCN}标识符`}
          initValue={name}
          binding={setName}
          tooltip="标识符是唯一标识，不可重复。"
        />
        <PropertyEditor
          name="title"
          displayName={`${elementTypeCN}标题`}
          initValue={title}
          binding={setTitle}
          sx={{ mt: 2 }}
          tooltip="标题是分组/页面的显示名称"
        />
      </ModalSection>
      <ModalSection last>
        <Typography color="red">
          注意：为了显示群组，需要在添加群组完成后立刻添加一个问题
        </Typography>
      </ModalSection>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          onClick={handleSave}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupEditModal;
