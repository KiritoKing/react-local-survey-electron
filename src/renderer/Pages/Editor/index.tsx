import React from 'react';
import { useParams } from 'react-router-dom';

function EditorPage() {
  const { surveyId } = useParams();

  return <div>Edit - {surveyId}</div>;
}

export default EditorPage;
