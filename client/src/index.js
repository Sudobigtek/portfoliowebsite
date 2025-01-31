import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import SimpleApp from './SimpleApp';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SimpleApp />
    </ThemeProvider>
  </React.StrictMode>
); 