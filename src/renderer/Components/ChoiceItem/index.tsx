/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, IconButton, Paper } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IChoice } from '../QuestionContentEditor';
import EditableText from './EditableText';

interface IProps {
  data: IChoice;
  onDelete?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (choice: IChoice) => boolean;
}

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
