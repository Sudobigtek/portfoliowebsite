import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
      }}
    >
      <CircularProgress
        size={40}
        thickness={2}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          mb: 2,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          letterSpacing: '0.1em',
          animation: 'fadeInOut 1.5s infinite',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0.4 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.4 },
          },
        }}
      >
        LOADING
      </Typography>
    </Box>
  );
};

export default LoadingScreen; 