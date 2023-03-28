import { ISurveyCache } from 'main/typing';
import React, { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';
import { SurveyListContext } from 'renderer/App';

const SurveyPage = () => {
  const { surveyId } = useParams();
  const nav = useNavigate();
  const surveys = (useContext(SurveyListContext) as any).data as ISurveyCache[];
  const survey = surveys.find((item) => item.id === surveyId);
  const model = new Model(survey!.data);
  const handleComplete = useCallback((sender: any) => {
    console.log(sender.data);
    nav('/complete');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
