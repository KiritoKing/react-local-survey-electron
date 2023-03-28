import React from 'react';
import { Grid } from '@mui/material';

const ItemList: React.FC<{
  children?: React.ReactNode | React.ReactNode[];
  itemSource?: any[];
  // eslint-disable-next-line no-unused-vars
  template?: (data: any) => React.ReactNode;
}> = ({ children, itemSource, template }) => {
  return (
    <Grid container spacing={2} sx={{ padding: '1rem' }}>
      {children}
      {template ? itemSource?.map((item) => template(item)) : itemSource}
    </Grid>
  );
};

export default ItemList;
