import { ISurveyCache } from 'main/typing';
import { useContext, useMemo } from 'react';
import { SurveyListContext } from 'renderer/App';

export default function useSurvey(surveyId?: string) {
  const surveys = (useContext(SurveyListContext) as any).data as ISurveyCache[];
  return useMemo(
    () => surveys?.find((item) => item.id === surveyId),
    [surveyId, surveys]
  );
}
