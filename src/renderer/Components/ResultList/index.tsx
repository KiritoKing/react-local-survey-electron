import { IResultCache } from 'main/typing';
import React from 'react';
import ItemList from '../ItemList';
import ResultItem from '../ResultItem';

interface IProps {
  data?: IResultCache[];
}

const ResultList: React.FC<IProps> = ({ data }) => {
  const itemTemplate = (item: IResultCache) => {
    return <ResultItem data={item} />;
  };
  return <ItemList itemSource={data} template={itemTemplate} />;
};

export default ResultList;
