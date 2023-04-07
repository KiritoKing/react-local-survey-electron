/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IChoice } from '../QuestionContentEditor';
import styles from './styles.module.scss';

interface IProps {
  data: IChoice;
  onDelete?: () => void;
  onChange?: (choice: IChoice) => void;
}

interface ITextProps {
  text: string;
  onChange?: (text: string) => void;
}

const EditableText: React.FC<ITextProps> = ({ text, onChange }) => {
  const [editing, setEditing] = useState(false);

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
  };

  return (
    <div
      className={styles['choice-text']}
      onDoubleClick={handleDoubleClickText}
      onKeyDown={handleKeydown}
      onBlur={handleBlur}
    >
      {text}
    </div>
  );
};

const ChoiceItem: React.FC<IProps> = ({ data, onDelete, onChange }) => {
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
      <IconButton sx={{ ml: 0.5, mr: 1 }}>
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
        <EditableText text={data.text} />
        <EditableText text={data.value} />
      </Box>
    </Paper>
  );
};

export default ChoiceItem;
