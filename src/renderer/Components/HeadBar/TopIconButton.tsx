/* eslint-disable react/require-default-props */
import React from 'react';
import IconButton from '@mui/material/IconButton';

interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// eslint-disable-next-line react/function-component-definition
const TopIconButton: React.FC<IProps> = (
  { children, ...props } = { disabled: false }
) => {
  return (
    <IconButton
      size="large"
      edge="start"
      aria-label="menu"
      sx={{ mr: 2, color: 'white' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </IconButton>
  );
};

export default TopIconButton;
