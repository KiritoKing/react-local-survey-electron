/* eslint-disable no-console */
import { createTheme, IconButton } from '@mui/material';
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
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider, closeSnackbar, SnackbarKey } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import PageFrame from './Components/PageFrame';
import CompletePage from './Pages/Completion';
import EditorPage from './Pages/Editor';
import Home from './Pages/Home';
import ResultPage from './Pages/Results';
import SurveyPage from './Pages/Survey';
import './Styles/App.css';
import ErrorInfo from './Components/ErrorInfo';
import SettingsPage from './Pages/Settings';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#19b394',
    },
    secondary: {
      main: '#0e6150',
    },
  },
});

interface IRoute {
  path: string;
  title: string;
  element: React.ReactNode;
  nodeRef: React.RefObject<any>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    title: '心理测评系统',
    element: <Home />,
    nodeRef: createRef(),
  },
  {
    path: '/editor/:surveyId?',
    element: <EditorPage />,
    title: '编辑问卷',
    nodeRef: createRef(),
  },
  {
    path: '/survey/:surveyId',
    element: <SurveyPage />,
    title: '填写问卷',
    nodeRef: createRef(),
  },
  {
    path: '/complete',
    element: <CompletePage />,
    title: '心理测评系统',
    nodeRef: createRef(),
  },
  {
    path: '/results/:surveyId',
    element: <ResultPage />,
    title: '结果管理',
    nodeRef: createRef(),
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    title: '设置',
    nodeRef: createRef(),
  },
];

const router = createHashRouter([
  {
    path: '/',
    element: <PageFrame />,
    errorElement: <ErrorInfo message="遇到了未知错误" enableBack />,
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

function sortSurveysByTime(surveys: ISurveyCache[]) {
  const sorter = (a: ISurveyCache, b: ISurveyCache) => {
    if (a?.lastModified === undefined || b?.lastModified === undefined)
      return 1; // 没有定义时间的放在最后
    if (a.lastModified > b.lastModified) return -1;
    return 1;
  };
  return surveys.sort(sorter);
}

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
          setSurveyCache(sortSurveysByTime(res));
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
      setSurveyCache(sortSurveysByTime(JSON.parse(cache) as ISurveyCache[]));
    } else {
      updateFromFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 使用useMemo来防止每次传递都刷新
  const contextData = useMemo(() => {
    return { data: surveyCache, refreshHandler: updateFromFiles };
  }, [surveyCache, updateFromFiles]);

  const snackBarButton = (id: SnackbarKey) => (
    <IconButton onClick={() => closeSnackbar(id)}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <SurveyListContext.Provider value={contextData}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            action={(snackBarId) => snackBarButton(snackBarId)}
          >
            <RouterProvider fallbackElement={<Home />} router={router} />
          </SnackbarProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </SurveyListContext.Provider>
  );
}
