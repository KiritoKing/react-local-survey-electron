import { useContext, useEffect, useState } from 'react';
import { routes, SurveyListContext } from 'renderer/App';

const needSurveyName = ['survey', 'results'];

// url=pathname(e.g. /login/1234)
function useTitle(url: string) {
  const [title, setTitle] = useState('心理测评系统');
  const paths = url.split('/');
  const { data: surveys } = useContext(SurveyListContext);

  useEffect(() => {
    for (let i = 0; i < routes.length; i += 1) {
      const routePaths = routes[i].path.split('/');
      if (routePaths[1] === paths[1] && surveys !== undefined) {
        console.log('Route title found!');
        // 需要显示问卷名的页面
        if (needSurveyName.includes(paths[1])) {
          const survey = surveys.find((s) => s.id === paths[2]);
          console.log(survey);
          if (survey) setTitle(`${routes[i].title} - ${survey.name}`);
        } else {
          setTitle(routes[i].title);
        }
      }
    }
  }, [url, surveys, paths]);

  return title;
}

export default useTitle;
