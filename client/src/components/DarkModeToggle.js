import React, { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../App';

const DarkModeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton 
      onClick={colorMode.toggleColorMode} 
      color="inherit"
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'rotate(180deg)',
        },
      }}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeToggle; 