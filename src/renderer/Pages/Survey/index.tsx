import { ISurveyCache } from 'main/typing';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';

const SurveyPage = () => {
  const { surveyId } = useParams();
  const nav = useNavigate();
  const surveys = JSON.parse(
    window.localStorage.getItem('surveyCache') as string // 该页面理论上不可能出现没有缓存的情况
  );
  const survey = (surveys as ISurveyCache[]).find(
    (item) => item.id === surveyId
  );
  const model = new Model(survey!.data);
  const handleComplete = useCallback((sender: any) => {
    console.log(sender.data);
    nav('/complete');
  }, []);
  model.onComplete.add(handleComplete);
  model.locale = 'zh-cn';

  return (
    <div>
      <Survey model={model} />
    </div>
  );
};

export default SurveyPage;
