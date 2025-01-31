import React, { createContext, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import LoadingScreen from './components/LoadingScreen';
import { NotificationProvider } from './components/NotificationProvider';

// Import pages (we'll create these next)
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#000000' : '#ffffff',
            light: mode === 'light' ? '#333333' : '#f5f5f5',
            dark: mode === 'light' ? '#000000' : '#e0e0e0',
          },
          secondary: {
            main: mode === 'light' ? '#ffffff' : '#000000',
            light: mode === 'light' ? '#ffffff' : '#333333',
            dark: mode === 'light' ? '#f5f5f5' : '#000000',
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? '#000000' : '#ffffff',
            secondary: mode === 'light' ? '#666666' : '#a0a0a0',
          },
        },
        typography: {
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          h1: {
            fontWeight: 300,
            letterSpacing: '0.1em',
          },
          h2: {
            fontWeight: 300,
            letterSpacing: '0.05em',
          },
          h3: {
            fontWeight: 300,
            letterSpacing: '0.05em',
          },
          h4: {
            fontWeight: 300,
            letterSpacing: '0.05em',
          },
          body1: {
            lineHeight: 1.8,
          },
          body2: {
            lineHeight: 1.6,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                textTransform: 'none',
                padding: '12px 24px',
                transition: 'all 0.3s ease-in-out',
              },
              outlined: {
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                transition: 'all 0.3s ease-in-out',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                transition: 'all 0.3s ease-in-out',
              },
            },
          },
        },
        spacing: 8,
        shape: {
          borderRadius: 0,
        },
      }),
    [mode],
  );

  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_GA_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <NotificationProvider>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <React.Suspense fallback={<LoadingScreen />}>
                <Router>
                  <div style={{ 
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/admin/login" element={<Login />} />
                      <Route 
                        path="/admin/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
                      <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                  </div>
                </Router>
              </React.Suspense>
            </ThemeProvider>
          </HelmetProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </ColorModeContext.Provider>
  );
}

export default App; 