/* eslint-disable react/function-component-definition */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISurveyCache } from '../../../main/typing';
import SurveyListItem from '../SurveyItem';
import ItemList from '../ItemList';

interface IProps {
  data?: ISurveyCache[];
  onFail?: () => void;
}

const SurveyList: React.FC<IProps> = ({ data, onFail }) => {
  const nav = useNavigate();

  const handleOpen = (survey: ISurveyCache) => {
    if (survey.data === undefined) {
      onFail && onFail();
      return;
    }
    console.log(
      `Name: ${survey.name}\nUUID: ${survey.id}\nHasData: ${
        survey.data !== undefined
      }\nPath: ${survey.path}`
    );
    nav(`/survey/${survey.id}`);
  };

  const handleDelete = (survey: ISurveyCache) => {
    console.log(`Delete: ${survey.id}`);
  };

  const handleEdit = (survey: ISurveyCache) => {
    console.log(`Edit: ${survey.id}`);
  };

  const itemTemplate = (item: ISurveyCache) => (
    <SurveyListItem
      onClick={() => handleOpen(item)}
      onDelete={() => handleDelete(item)}
      onEdit={() => handleEdit(item)}
      data={item}
    />
  );

  return <ItemList itemSource={data} template={itemTemplate} />;
};

export default SurveyList;
