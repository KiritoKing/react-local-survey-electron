import { Box, Typography } from '@mui/material';
import { IResultCache } from 'main/typing';
import React, { useMemo } from 'react';
import ItemList from '../ItemList';
import ResultItem from '../ResultItem';

interface IProps {
  data?: IResultCache[];
}

const ResultList: React.FC<IProps> = ({ data }) => {
  const total = useMemo(() => data?.length ?? 0, [data]);
  const itemTemplate = (item: IResultCache) => {
    return <ResultItem data={item} />;
  };
  return (
    <Box display="flex" flexDirection="column" alignContent="center">
      <Typography align="center" color="#7a7b78">
        共找到 <b>{total}</b> 份结果
      </Typography>
      <ItemList itemSource={data?.slice(0, 100)} template={itemTemplate} />
    </Box>
  );
};

export default ResultList;
