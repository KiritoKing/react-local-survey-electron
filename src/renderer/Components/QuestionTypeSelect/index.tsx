/* eslint-disable react/no-array-index-key */
import {
  Box,
  TextField,
  SxProps,
  MenuItem,
  ListSubheader,
} from '@mui/material';
import React from 'react';
import {
  getQuestionTypeNameCn,
  selectorTypes,
  simpleSelectorTypes,
  textQuestionTypes,
} from '../QuestionEditPanel/typing';

interface ITextbox {
  name: string;
  displayName: string;
  initValue?: string;
  // eslint-disable-next-line no-unused-vars
  binding?: (val: string) => void;
  sx?: SxProps;
  tooltip?: string;
}

const QuestionTypeSelect: React.FC<ITextbox> = ({
  name,
  displayName,
  initValue,
  binding,
  sx,
  tooltip,
}) => (
  <Box>
    <TextField
      fullWidth
      select
      id={name}
      label={displayName}
      value={initValue}
      onChange={(e) => binding && binding(e.target.value)}
      sx={sx}
      helperText={tooltip}
    >
      <ListSubheader>文本输入</ListSubheader>
      {textQuestionTypes.map((item, index) => (
        <MenuItem key={`text-${index}`} value={item}>
          {getQuestionTypeNameCn(item)}
        </MenuItem>
      ))}
      <ListSubheader>选择题</ListSubheader>
      {selectorTypes.map((item, index) => (
        <MenuItem key={`selector-${index}`} value={item}>
          {getQuestionTypeNameCn(item)}
        </MenuItem>
      ))}
      <ListSubheader>简单选择</ListSubheader>
      {simpleSelectorTypes.map((item, index) => (
        <MenuItem key={`simple-selector-${index}`} value={item}>
          {getQuestionTypeNameCn(item)}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export default QuestionTypeSelect;
