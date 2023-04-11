import { Box, SxProps, TextField } from '@mui/material';
import React from 'react';

interface ITextbox {
  name: string;
  displayName: string;
  initValue?: any;
  // eslint-disable-next-line no-unused-vars
  binding?: (val: any) => void;
  sx?: SxProps;
  tooltip?: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  numeric?: boolean;
}

const PropertyEditor: React.FC<ITextbox> = ({
  name,
  displayName,
  initValue,
  binding,
  sx,
  tooltip,
  autoFocus,
  numeric,
  fullWidth = true,
}) => (
  <Box>
    <TextField
      fullWidth={fullWidth}
      type="text"
      id={name}
      label={displayName}
      value={initValue}
      onChange={(e) => binding && binding(e.target.value)}
      helperText={tooltip}
      sx={sx}
      autoFocus={autoFocus}
      inputProps={numeric ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}}
    />
  </Box>
);

export default PropertyEditor;
