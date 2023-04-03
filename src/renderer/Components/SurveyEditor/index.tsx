import React from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';

interface IProps {
  data: Model;
}

const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  model.locale = 'zh-cn';
  model.onAfterRenderQuestion.add((sender, options) => {
    const rect = options.htmlElement.getBoundingClientRect();
    console.log(`${options.question.name}.top=${rect.top}`);
  });
  return <Survey model={model} mode="display" />;
};
export default SurveyEditor;
