import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import { FormatQuote } from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Featured works (will be managed through admin later)
  const featuredWorks = [
    {
      id: 1,
      title: 'Latest Campaign',
      image: '/images/featured/campaign.jpg',
      category: 'Campaign',
    },
    {
      id: 2,
      title: 'Fashion Week',
      image: '/images/featured/runway.jpg',
      category: 'Runway',
    },
    {
      id: 3,
      title: 'Magazine Cover',
      image: '/images/featured/editorial.jpg',
      category: 'Editorial',
    },
  ];

  const testimonials = [
    {
      quote: 'An absolute professional with incredible presence and versatility.',
      author: 'Jane Smith',
      role: 'Fashion Director, Vogue',
    },
    {
      quote: 'Working with her was a true creative collaboration. Outstanding results every time.',
      author: 'John Davis',
      role: 'Celebrity Photographer',
    },
  ];

  // In the Home component, add this schema:
  const homeSchema = {
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${process.env.REACT_APP_SITE_URL}#identity`,
      name: 'Model Name',
      jobTitle: 'Professional Model',
      image: '/images/hero.jpg',
      description:
        'Professional model available for fashion shows, photo shoots, and brand campaigns.',
      url: process.env.REACT_APP_SITE_URL,
      sameAs: [
        'https://instagram.com/modelname',
        'https://facebook.com/modelname',
        'https://linkedin.com/in/modelname',
      ],
    },
  };

  return (
    <>
      <SEO
        title="Professional Model"
        description="Professional model available for fashion shows, photo shoots, and brand campaigns. View portfolio and book now."
        image="/images/hero.jpg"
        schema={homeSchema}
      />
      <Navigation />

      {/* Hero Section */}
      <Box
        sx={{
          height: isMobile ? '70vh' : '90vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'url("/images/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', color: 'white', textAlign: 'center' }}>
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 'light',
              letterSpacing: '0.1em',
            }}
          >
            MODEL NAME
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h4'}
            sx={{
              mb: 4,
              fontWeight: 'light',
              letterSpacing: '0.05em',
            }}
          >
            Professional Model & Influencer
          </Typography>
          <Button
            component={Link}
            to="/portfolio"
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
              },
            }}
          >
            View Portfolio
          </Button>
        </Container>
      </Box>

      {/* Featured Works Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Featured Works
        </Typography>
        <Grid container spacing={4}>
          {featuredWorks.map(work => (
            <Grid item xs={12} md={4} key={work.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={work.image}
                  alt={work.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {work.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {work.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Client Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    bgcolor: 'background.default',
                  }}
                >
                  <FormatQuote
                    sx={{
                      fontSize: 40,
                      opacity: 0.1,
                      position: 'absolute',
                      top: 16,
                      left: 16,
                    }}
                  />
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: 2,
                      fontStyle: 'italic',
                      pl: 2,
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {testimonial.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Collaborate?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Available for fashion shows, photo shoots, and brand campaigns
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Get in Touch
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Home;
