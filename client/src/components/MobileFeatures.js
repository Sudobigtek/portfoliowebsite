import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const MobileFeatures = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: isMobile ? theme.spacing(2) : theme.spacing(4),
        touchAction: 'manipulation',
      }}
    >
      {children}
    </Box>
  );
};

export default MobileFeatures;
