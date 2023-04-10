import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import GroupEditModal from '../GroupEditModal';
import QuestionEditModal from '../QuestionEditModal';
import { ElementType } from '../SurveyEditPanel';

interface IProps {
  survey?: Model;
  mode?: ElementType;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  onSave?: () => void;
  container?: any;
}

const AddingModal: React.FC<IProps> = ({
  survey,
  mode,
  open,
  setOpen,
  onSave,
  container,
}) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (!open || mode === undefined) return null; // 没有打开时不加载

  switch (mode) {
    case 'page':
      return (
        <GroupEditModal
          element={mode}
          open={open}
          onClose={handleClose}
          onSave={onSave}
          container={survey}
          initName={`Page${survey?.pages.length}`}
        />
      );
    case 'panel':
      return (
        <GroupEditModal
          element={mode}
          open={open}
          onClose={handleClose}
          onSave={onSave}
          container={survey?.currentPage}
          initName={`Panel${survey?.currentPage?.elements.length}`}
        />
      );
    case 'question':
      return (
        <QuestionEditModal
          container={
            container ??
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
