/* eslint-disable no-console */
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ISurveyCache } from 'main/typing';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import PageFrame from './Components/PageFrame';
import Creator from './Pages/Creator';
import Home from './Pages/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#19b394',
    },
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: <PageFrame />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/creator',
        element: <Creator />,
      },
    ],
  },
]);

export const SurveyListContext = createContext<unknown>(null);

export default function App() {
  const [surveyCache, setSurveyCache] = useState<ISurveyCache[]>();
  const updateFromFiles = useCallback(() => {
    console.log('Read from file');
    window.electron
      .openFolder()
      .then((res: any) => {
        // 注意这里res其实是 ISurvey + Path 的结合对象
        setSurveyCache(res);
        window.localStorage.setItem('surveyCache', JSON.stringify(res));
        return res;
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
