import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorInfo from 'renderer/Components/ErrorInfo';
import useSurvey from 'renderer/Hooks/useSurvey';

function EditorPage() {
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);

  return (
    <div>Edit - {survey?.name ?? <ErrorInfo message="未能读取到数据" />}</div>
  );
}

export default EditorPage;
