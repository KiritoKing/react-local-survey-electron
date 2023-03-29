/* eslint-disable no-console */
import { ISurveyCache } from 'main/typing';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { SurveyListContext } from 'renderer/App';
import SurveyList from 'renderer/Components/SurveyList';

function Home() {
  const dataContext = useContext(SurveyListContext) as any;
  const surveyCache = dataContext.data as ISurveyCache[];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => enqueueSnackbar('测试消息', { variant: 'error' })}
        >
          Show Toast
        </button>
        <SurveyList data={surveyCache} />
      </div>
    </div>
  );
}

export default Home;
