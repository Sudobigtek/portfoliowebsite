import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram />, url: 'https://instagram.com' },
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
  ];

  const footerLinks = [
    { text: 'Portfolio', path: '/portfolio' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center">
          {/* Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 'light',
              letterSpacing: '0.1em',
            }}
          >
            MODEL NAME
          </Typography>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ '& a': { color: 'text.secondary', textDecoration: 'none' } }}
          >
            {footerLinks.map(link => (
              <MuiLink
                key={link.text}
                component={Link}
                to={link.path}
                sx={{ '&:hover': { color: 'text.primary' } }}
              >
                {link.text}
              </MuiLink>
            ))}
          </Stack>

          {/* Social Links */}
          <Stack direction="row" spacing={2}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} Model Name. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
