/* eslint-disable no-console */
import { ISurveyCache } from 'main/typing';
import React, { useContext } from 'react';
import { SurveyListContext } from 'renderer/App';
import SurveyList from 'renderer/Components/SurveyList';

function Home() {
  const dataContext = useContext(SurveyListContext) as any;
  const surveyCache = dataContext.data as ISurveyCache[];
  return (
    <div>
      <div>
        <SurveyList data={surveyCache} />
      </div>
    </div>
  );
}

export default Home;
