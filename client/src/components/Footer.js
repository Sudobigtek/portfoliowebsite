import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import {
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: LinkedIn, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}{' '}
            <Link color="inherit" href="/">
              Portfolio Website
            </Link>
            {'. All rights reserved.'}
          </Typography>

          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                color="inherit"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
