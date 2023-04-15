import { useContext, useMemo } from 'react';
import { ConfigContext, routes, SurveyListContext } from 'renderer/App';

const needSurveyName = ['survey', 'results', 'editor'];

// url=pathname(e.g. /login/1234)
function useTitle(url: string) {
  const paths = url.split('/');
  const { data: surveys } = useContext(SurveyListContext);
  const { data: config } = useContext(ConfigContext);
  const title: string = useMemo(() => {
    for (let i = 0; i < routes.length; i += 1) {
      const routePaths = routes[i].path.split('/');
      if (routePaths[1] === paths[1] && surveys !== undefined) {
        if (paths[1] === '' && config?.title !== undefined) {
          console.log(
            `Config Detected, index title has been set as ${routes[i].title}`
          );
          return config.title;
        }
        console.log(`Route title has been set as ${routes[i].title}`);
        // 需要显示问卷名的页面
        if (needSurveyName.includes(paths[1])) {
          const survey = surveys.find((s) => s.id === paths[2]);
          console.log(`Survey name has been set as ${survey?.name}`);
          if (survey) return `${routes[i].title} - ${survey.name}`;
        }
        return routes[i].title;
      }
    }
    return routes[0].title;
  }, [config?.title, paths, surveys]);

  return title;
}

export default useTitle;
