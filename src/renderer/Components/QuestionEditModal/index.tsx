import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Switch,
  Typography,
} from '@mui/material';
import { Question, PanelModel, PageModel } from 'survey-core';
import ModalSection from '../ModalSection';
import PropertyEditor from '../PropertyEditor';
import QuestionTypeSelect from '../QuestionTypeSelect';
import { allQuestionTypes, QuestionType } from '../QuestionEditPanel/typing';
import QuestionContentEditor from '../QuestionContentEditor';

interface IProps {
  data?: Question;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  container?: PanelModel | PageModel;
}

const QuestionEditModal: React.FC<IProps> = ({
  open,
  data,
  onClose,
  onSave,
  container,
}) => {
  const isCreating = useMemo(
    () => data === undefined && container,
    [data, container]
  );
  if (isCreating) {
    if (container === undefined)
      console.log('[Editing Modal] Warning: container is undefined');
    else console.log('[Question Edit Model] Creating Mode');
  }

  const [name, setName] = useState(data?.name ?? '');
  const [title, setTitle] = useState(data?.title ?? '');
  const [type, setType] = useState(data?.getType() ?? allQuestionTypes[0]);
  const [isRequired, setIsRequired] = useState(data?.isRequired ?? false);
  const [choices, setChoices] = useState(data?.choices ?? []);

  const handleSave = () => {
    if (data === undefined) {
      // 创建新问题
      if (container === undefined || type === undefined) return;
      const question = container.addNewQuestion(type, name);
      question.title = title;
      question.isRequired = isRequired;
      question.choices = choices;
    } else {
      data.name = name;
      data.title = title;
      data.isRequired = isRequired;
    }
    onSave && onSave();
    onClose();
  };

  const handleEditChoices = (newChoices: any) => {
    setChoices(newChoices);
  };

  return (
    <Dialog onClose={onClose} open={open} sx={{ padding: 2 }} fullWidth>
      <DialogTitle>编辑问题</DialogTitle>
      <ModalSection title="问题元数据">
        <PropertyEditor
          name="name"
          displayName="问题标识符"
          initValue={name}
          binding={setName}
          tooltip="问题标识符是问题的唯一标识，不可重复，导出时将作为表头。"
        />
        <PropertyEditor
          name="title"
          displayName="问题标题"
          initValue={title}
          binding={setTitle}
          sx={{ mt: 2 }}
          tooltip="问题标题是问题的显示名称"
        />
        {data === undefined && (
          <QuestionTypeSelect
            name="type"
            displayName="问题类型"
            initValue={type ?? allQuestionTypes[0]}
            binding={setType}
            sx={{ mt: 2 }}
          />
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Switch
            checked={isRequired}
            onChange={(_e, value) => setIsRequired(value)}
          />
          <Typography>是否为必填项</Typography>
        </Box>
      </ModalSection>
      <ModalSection last title="问题内容">
        <QuestionContentEditor
          persetType={type as QuestionType}
          data={data}
          onUpdate={handleEditChoices}
        />
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

export default QuestionEditModal;
