/* eslint-disable no-console */
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { createContext } from 'react';
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

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
