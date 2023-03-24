import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback } from 'react';

const surveyJson = {
  elements: [
    {
      name: 'FirstName',
      title: 'Enter your first name:',
      type: 'text',
    },
    {
      name: 'LastName',
      title: 'Enter your last name:',
      type: 'text',
    },
  ],
};

function Questionaire() {
  const survey = new Model(surveyJson);
  const alertResult = useCallback((sender: Model) => {
    const result = JSON.stringify(sender.data);
    console.log(result);
  }, []);
  survey.onComplete.add(alertResult);

  const setTitle = useCallback(async () => {
    const filePath = await window.electron.importFile();
    window.electron.setTitle(filePath);
  }, []);

  return (
    <div>
      <h1>Questionaire</h1>
      <button type="button" onClick={setTitle}>
        Set Title
      </button>
      <Survey model={survey} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questionaire />} />
      </Routes>
    </Router>
  );
}
