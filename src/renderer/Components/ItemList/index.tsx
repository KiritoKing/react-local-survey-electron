import React from 'react';
import { Grid, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';
import ErrorInfo from '../ErrorInfo';

type DisplayPattern = 'Grid' | 'Stack';

const ItemList: React.FC<{
  children?: React.ReactNode | React.ReactNode[];
  itemSource?: any[];
  // eslint-disable-next-line no-unused-vars
  template?: (data: any) => React.ReactNode;
  pattern?: DisplayPattern;
}> = ({ children, itemSource, template, pattern = 'Grid' }) => {
  if (!children && (!itemSource || itemSource?.length === 0))
    return <ErrorInfo message="这里空空如也，没有数据~" />;
  if (pattern.toLowerCase() === 'stack')
    return (
      <Stack spacing={2} sx={{ padding: '0.8rem' }}>
        {children}
        {itemSource?.map((item) =>
          template ? template(item) : JSON.stringify(item) ?? item.toString()
        )}
      </Stack>
    );
  if (pattern.toLowerCase() === 'grid')
    return (
      <Grid container spacing={2} sx={{ padding: '1rem' }}>
        {children}
        {itemSource?.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id ?? uuid()}>
            {template
              ? template(item)
              : JSON.stringify(item) ?? item.toString()}
          </Grid>
        ))}
      </Grid>
    );
  return <ErrorInfo message="列表渲染遇到了错误，请重试" />;
};

export default ItemList;
