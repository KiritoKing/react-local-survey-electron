/* eslint-disable no-console */
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ISurveyCache } from 'main/typing';
import React, {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import PageFrame from './Components/PageFrame';
import CompletePage from './Pages/Completion';
import Creator from './Pages/Creator';
import Home from './Pages/Home';
import ResultPage from './Pages/Results';
import SurveyPage from './Pages/Survey';
import './Styles/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#19b394',
    },
  },
});

interface IRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  nodeRef: React.RefObject<any>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    nodeRef: createRef(),
  },
  {
    path: '/creator',
    element: <Creator />,
    name: 'Creator',
    nodeRef: createRef(),
  },
  {
    path: '/survey/:surveyId',
    element: <SurveyPage />,
    name: 'Survey',
    nodeRef: createRef(),
  },
  {
    path: '/complete',
    element: <CompletePage />,
    name: 'Complete',
    nodeRef: createRef(),
  },
  {
    path: '/results/:surveyId',
    element: <ResultPage />,
    name: 'Results',
    nodeRef: createRef(),
  },
];

const router = createHashRouter([
  {
    path: '/',
    element: <PageFrame />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

export const SurveyListContext = createContext<{
  data: ISurveyCache[] | undefined;
  refreshHandler: () => void;
}>(undefined as any);

export default function App() {
  const [surveyCache, setSurveyCache] = useState<ISurveyCache[]>();
  const updateFromFiles = useCallback(() => {
    console.log('Read from file');
    window.electron.ipcRenderer
      .invoke('open-folder')
      .then((res: any) => {
        // eslint-disable-next-line promise/always-return
        if (res !== null) {
          // 注意这里res其实是 ISurvey + Path 的结合对象
          setSurveyCache(res);
          window.localStorage.setItem('surveyCache', JSON.stringify(res));
        }
      })
      .catch(console.log);
  }, []);

  // 初始化页面时，从本地缓存中读取数据
  useEffect(() => {
    const cache = window.localStorage.getItem('surveyCache');
    console.log('Init list');
    if (cache) {
      console.log('Read from local storage');
      setSurveyCache(JSON.parse(cache));
    } else {
      updateFromFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 使用useMemo来防止每次传递都刷新
  const contextData = useMemo(() => {
    return { data: surveyCache, refreshHandler: updateFromFiles };
  }, [surveyCache, updateFromFiles]);

  return (
    <React.StrictMode>
      <SurveyListContext.Provider value={contextData}>
        <ThemeProvider theme={theme}>
          <RouterProvider fallbackElement={<Home />} router={router} />
        </ThemeProvider>
      </SurveyListContext.Provider>
    </React.StrictMode>
  );
}
