import { ISurveyCache } from 'main/typing';
import { useContext, useMemo } from 'react';
import { SurveyListContext } from 'renderer/App';

export default function useSurvey(surveyId?: string) {
  const surveys = (useContext(SurveyListContext) as any).data as ISurveyCache[];
  return useMemo(() => {
    const target = surveys?.find((item) => item.id === surveyId);
    console.log(`useSurvey: ${target?.name}`);
    return target;
  }, [surveyId, surveys]);
}
