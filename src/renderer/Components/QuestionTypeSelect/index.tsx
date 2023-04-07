import { Box, TextField, SxProps, MenuItem } from '@mui/material';
import React from 'react';
import {
  allQuestionTypes,
  getQuestionTypeNameCn,
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
      {allQuestionTypes.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MenuItem key={index} value={item}>
          {getQuestionTypeNameCn(item)}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export default QuestionTypeSelect;
