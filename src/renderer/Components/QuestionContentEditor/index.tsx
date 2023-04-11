/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Question } from 'survey-core';
import { QuestionType, selectorTypes } from '../QuestionEditPanel/typing';
import ChoiceList from '../ChoiceList';

export interface IChoice {
  value: any;
  text: string;
  imageLink?: string; // A link to the image or video that represents this choice value. Applies only to Image Picker questions.
}

interface IProps {
  data?: Question;
  persetType?: QuestionType;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (data?: any) => void;
}

const QuestionContentEditor: React.FC<IProps> = ({
  data,
  onUpdate,
  persetType,
}) => {
  const type = data?.getType() ?? persetType;

  if (type === undefined) return null; // 如果既没有数据 又没有新建类型，那么就不渲染

  if (selectorTypes.includes(type))
    return <ChoiceList data={data} onUpdate={onUpdate} />;

  return <div>该类型问题没有数据可以更改</div>;
};

export default QuestionContentEditor;
