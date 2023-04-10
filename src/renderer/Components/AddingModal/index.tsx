import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import QuestionEditModal from '../QuestionEditModal';
import { ElementType } from '../SurveyEditPanel';

interface IProps {
  survey?: Model;
  mode?: ElementType;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  onSave?: () => void;
}

const AddingModal: React.FC<IProps> = ({
  survey,
  mode,
  open,
  setOpen,
  onSave,
}) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (!open || mode === undefined) return null; // 没有打开时不加载

  switch (mode) {
    case 'page':
      break;
    case 'panel':
      break;
    case 'question':
      return (
        <QuestionEditModal
          container={
            survey?.pages[survey.currentPageNo] ??
            survey?.addNewPage(`page${survey.pages.length}`)
          }
          open={open}
          onClose={handleClose}
          onSave={onSave}
        />
      );
    default:
      break;
  }
  return null;
};

export default AddingModal;
