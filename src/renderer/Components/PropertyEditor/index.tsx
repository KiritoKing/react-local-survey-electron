import { Box, SxProps, TextField } from '@mui/material';
import React from 'react';

interface ITextbox {
  name: string;
  displayName: string;
  initValue?: string;
  // eslint-disable-next-line no-unused-vars
  binding?: (val: string) => void;
  sx?: SxProps;
  tooltip?: string;
  autoFocus?: boolean;
}

const PropertyEditor: React.FC<ITextbox> = ({
  name,
  displayName,
  initValue,
  binding,
  sx,
  tooltip,
  autoFocus,
}) => (
  <Box>
    <TextField
      fullWidth
      type="text"
      id={name}
      label={displayName}
      value={initValue}
      onChange={(e) => binding && binding(e.target.value)}
      helperText={tooltip}
      sx={sx}
      autoFocus={autoFocus}
    />
  </Box>
);

export default PropertyEditor;
