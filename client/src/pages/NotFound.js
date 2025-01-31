import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <Navigation />
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            mb: 8,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography color="text.secondary" paragraph>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
            Return Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
