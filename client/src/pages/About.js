import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const measurements = {
    height: '5\'9" / 175cm',
    bust: '32" / 81cm',
    waist: '24" / 61cm',
    hips: '34" / 86cm',
    shoes: '8 US / 39 EU',
    hair: 'Brown',
    eyes: 'Blue',
  };

  const experience = [
    {
      year: '2023',
      events: [
        'New York Fashion Week - Spring/Summer Collection',
        'Vogue Italia Editorial Spread',
        'Luxury Brand Campaign',
      ],
    },
    {
      year: '2022',
      events: [
        'Paris Fashion Week - Fall/Winter Collection',
        'Elle Magazine Cover Shoot',
        'International Fashion Campaign',
      ],
    },
  ];

  const aboutSchema = {
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Model Name',
      description: 'With over 5 years of experience in the fashion industry...',
      height: measurements.height,
      image: '/images/about/profile.jpg',
      affiliation: [
        {
          '@type': 'Organization',
          name: 'Agency Name New York',
          location: 'New York',
        },
        {
          '@type': 'Organization',
          name: 'Agency Name Paris',
          location: 'Paris',
        },
      ],
    },
  };

  const skills = [
    { name: 'Fashion Shows', level: 95 },
    { name: 'Editorial', level: 90 },
    { name: 'Commercial', level: 85 },
    { name: 'Brand Campaigns', level: 92 },
  ];

  return (
    <>
      <SEO
        title="About Me - Professional Model"
        description="Learn more about my experience, skills, and journey in the modeling industry."
      />
      <Navigation />

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6}>
          {/* Bio Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              With over [X] years of experience in the modeling industry, I've had the privilege of
              working with renowned brands and photographers, creating compelling visual stories
              that captivate and inspire.
            </Typography>
            <Typography variant="body1" paragraph>
              My passion for fashion and art drives me to constantly evolve and push creative
              boundaries. I bring professionalism, versatility, and dedication to every project.
            </Typography>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: '500px',
                backgroundImage: 'url("/images/about.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Expertise
            </Typography>
            <Grid container spacing={4}>
              {skills.map(skill => (
                <Grid item xs={12} sm={6} key={skill.name}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      {skill.name}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;
