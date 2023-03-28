import { IResultCache } from 'main/typing';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultList from 'renderer/Components/ResultList';

const ResultPage = () => {
  const { surveyId } = useParams();
  const [data, setData] = React.useState<IResultCache[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('get-result', surveyId)
      .then((res) => {
        setData(res);
        return res;
      })
      .catch(console.log);
  }, [surveyId]);

  return <ResultList data={data} />;
};
export default ResultPage;
