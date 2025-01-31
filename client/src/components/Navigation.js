import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, Instagram, Facebook, LinkedIn } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Portfolio', path: '/portfolio' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    {
      icon: <Instagram />,
      url: process.env.REACT_APP_INSTAGRAM_URL || 'https://instagram.com/modelname',
      label: 'Instagram',
    },
    {
      icon: <Facebook />,
      url: process.env.REACT_APP_FACEBOOK_URL || 'https://facebook.com/modelname',
      label: 'Facebook',
    },
    {
      icon: <LinkedIn />,
      url: process.env.REACT_APP_LINKEDIN_URL || 'https://linkedin.com/in/modelname',
      label: 'LinkedIn',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = path => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <List>
      {menuItems.map(item => (
        <ListItem
          button
          component={Link}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
          selected={isActive(item.path)}
        >
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              style: {
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={trigger ? 1 : 0}
        sx={{
          backgroundColor: trigger
            ? theme.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.98)'
              : 'rgba(255, 255, 255, 0.98)'
            : 'transparent',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: trigger ? 'blur(8px)' : 'none',
          borderBottom: trigger
            ? `1px solid ${
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              }`
            : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: trigger ? 'text.primary' : 'inherit',
                fontWeight: 'light',
                letterSpacing: '0.1em',
              }}
            >
              MODEL NAME
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: trigger ? 'text.primary' : 'inherit',
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                {menuItems.map(item => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color: trigger ? 'text.primary' : 'inherit',
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <DarkModeToggle />
              {socialLinks.map(link => (
                <IconButton
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  sx={{
                    color: trigger ? 'text.primary' : 'inherit',
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Navigation;
