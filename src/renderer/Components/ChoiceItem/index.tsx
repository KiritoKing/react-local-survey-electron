/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, IconButton, Paper } from '@mui/material';
import React, { useRef, useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IChoice } from '../QuestionContentEditor';
import styles from './styles.module.scss';

interface IProps {
  data: IChoice;
  onDelete?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (choice: IChoice) => boolean;
}

interface ITextProps {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (text: string) => boolean;
}

const EditableText: React.FC<ITextProps> = ({ text, onChange }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmitChange = () => {
    if (ref.current) {
      onChange?.(ref.current.innerText);
    }
  };

  const handleDoubleClickText = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element = e.target as HTMLDivElement;
    element.contentEditable = 'true';
    element.focus();
    setEditing(true);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editing === false) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const element = e.target as HTMLDivElement;
      element.contentEditable = 'false';
      setEditing(false);
    }
  };

  const handleBlur = () => {
    window.getSelection()?.removeAllRanges();
    handleSubmitChange();
  };

  return (
    <div
      className={styles['choice-text']}
      onDoubleClick={handleDoubleClickText}
      onKeyDown={handleKeydown}
      onBlur={handleBlur}
      ref={ref}
    >
      {text}
    </div>
  );
};

const ChoiceItem: React.FC<IProps> = ({ data, onDelete, onChange }) => {
  const handleTitleChange = (text: string) => {
    return onChange?.({ text, value: data.value }) ?? false;
  };

  const handleValueChange = (value: any) => {
    return onChange?.({ value, text: data.text }) ?? false;
  };

  return (
    <Paper
      sx={{
        width: '100%',
        padding: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      elevation={3}
    >
      <IconButton onClick={onDelete} sx={{ ml: 0.5, mr: 1 }}>
        <RemoveCircleOutlineIcon color="error" />
      </IconButton>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          pr: 2,
        }}
      >
        <EditableText text={data.text} onChange={handleTitleChange} />
        <EditableText text={data.value} onChange={handleValueChange} />
      </Box>
    </Paper>
  );
};

export default ChoiceItem;
