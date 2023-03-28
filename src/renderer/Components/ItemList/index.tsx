import React from 'react';
import { Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';

const ItemList: React.FC<{
  children?: React.ReactNode | React.ReactNode[];
  itemSource?: any[];
  // eslint-disable-next-line no-unused-vars
  template?: (data: any) => React.ReactNode;
}> = ({ children, itemSource, template }) => {
  return (
    <Grid container spacing={2} sx={{ padding: '1rem' }}>
      {children}
      {itemSource?.map((item) => (
        <Grid item xs={6} md={4} key={item.id ?? uuid()}>
          {template ? template(item) : JSON.stringify(item) ?? item.toString()}
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
