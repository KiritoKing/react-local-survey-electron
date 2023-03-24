/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [survey, setSurvey] = useState<Model>();
  const nav = useNavigate();

  const alertResult = useCallback((sender: Model) => {
    const result = JSON.stringify(sender.data);
    console.log(result);
  }, []);

  const clickHandler = useCallback(async () => {
    const data = await window.electron.importFile();
    console.log(data);
    if (data !== null && data !== undefined) {
      setSurvey(new Model(data));
    }
  }, []);

  const createNavHandler = () => {
    nav('/creator');
  };

  useEffect(() => {
    console.log('refreshed');
    if (survey !== undefined) survey.onComplete.add(alertResult);
  }, [alertResult, survey]);

  return (
    <div>
      <h1>Questionaire</h1>
      <button type="button" onClick={clickHandler}>
        Open File
      </button>
      <button type="button" onClick={createNavHandler}>
        Create
      </button>
      {survey && <Survey model={survey} />}
    </div>
  );
}

export default Home;
