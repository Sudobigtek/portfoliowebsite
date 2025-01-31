import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Paper,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Tabs,
  Tab,
  Fade,
} from '@mui/material';
import {
  Instagram,
  Facebook,
  LinkedIn,
  Close,
  ZoomIn,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';

const SimpleApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [category, setCategory] = useState('all');

  // Portfolio images data
  const portfolioImages = [
    {
      img: '/images/portfolio/editorial1.jpg',
      title: 'Editorial Shoot 1',
      category: 'editorial',
    },
    {
      img: '/images/portfolio/runway1.jpg',
      title: 'Fashion Week 2023',
      category: 'runway',
    },
    {
      img: '/images/portfolio/commercial1.jpg',
      title: 'Summer Campaign',
      category: 'commercial',
    },
    {
      img: '/images/portfolio/editorial2.jpg',
      title: 'Magazine Cover',
      category: 'editorial',
    },
    {
      img: '/images/portfolio/runway2.jpg',
      title: 'Designer Showcase',
      category: 'runway',
    },
    {
      img: '/images/portfolio/commercial2.jpg',
      title: 'Brand Campaign',
      category: 'commercial',
    },
    // Add more images as needed
  ];

  const modelInfo = {
    name: 'Jane Doe',
    title: 'Professional Model',
    measurements: {
      height: '5\'10" / 178cm',
      bust: '32" / 81cm',
      waist: '24" / 61cm',
      hips: '34" / 86cm',
      shoes: 'US 8 / EU 39',
      hair: 'Brown',
      eyes: 'Blue',
    },
    experience: [
      {
        year: '2023',
        event: 'Paris Fashion Week',
        description: 'Walked for leading luxury brands',
      },
      {
        year: '2022',
        event: 'Vogue Cover',
        description: 'Featured on Vogue Magazine cover',
      },
      {
        year: '2021',
        event: 'Global Brand Campaign',
        description: 'Lead model for international fashion brand',
      },
    ],
  };

  // Memoize handlers for better performance
  const handleImageClick = useCallback(image => {
    const index = filteredImages.findIndex(img => img.img === image.img);
    setSelectedIndex(index);
    setSelectedImage(image);
  }, [filteredImages]);

  const handlePrevImage = useCallback(e => {
    e.stopPropagation();
    const newIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [selectedIndex, filteredImages]);

  const handleNextImage = useCallback(e => {
    e.stopPropagation();
    const newIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [selectedIndex, filteredImages]);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(0); // Reset index when closing
  }, []);

  const handleCategoryChange = useCallback((event, newValue) => {
    setCategory(newValue);
    setSelectedImage(null); // Close modal when changing categories
    setSelectedIndex(0); // Reset index when changing categories
  }, []);

  const filteredImages = category === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === category);

  // Add keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevImage(e);
          break;
        case 'ArrowRight':
          handleNextImage(e);
          break;
        case 'Escape':
          handleCloseModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrevImage, handleNextImage, handleCloseModal]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 300 }}>
            {modelInfo.name.toUpperCase()}
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Portfolio</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section - Add scroll button */}
      <Box
        sx={{
          height: '80vh',
          position: 'relative',
          backgroundImage: 'url("/images/hero.jpg")',
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
          <Typography variant="h1" sx={{ fontWeight: 300, letterSpacing: '0.2em', mb: 2 }}>
            {modelInfo.name.toUpperCase()}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '0.1em', mb: 4 }}>
            {modelInfo.title}
          </Typography>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="large" 
            sx={{ 
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
            onClick={() => {
              document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Portfolio
          </Button>
        </Container>
      </Box>

      {/* Portfolio Section - Add ID for scroll */}
      <Container id="portfolio" maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
          Portfolio
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All" value="all" />
            <Tab label="Editorial" value="editorial" />
            <Tab label="Runway" value="runway" />
            <Tab label="Commercial" value="commercial" />
          </Tabs>
        </Box>

        <ImageList
          variant="masonry"
          cols={3}
          gap={16}
          sx={{
            mb: 8,
            '& .MuiImageListItem-root': {
              overflow: 'hidden',
              '&:hover': {
                '& .image-overlay': {
                  opacity: 1,
                },
                '& img': {
                  transform: 'scale(1.05)',
                },
              },
            },
          }}
        >
          {filteredImages.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              <Box
                className="image-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <ZoomIn sx={{ color: 'white', fontSize: 40 }} />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      {/* Image Modal - Add loading state */}
      <Modal 
        open={!!selectedImage} 
        onClose={handleCloseModal} 
        closeAfterTransition
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              maxHeight: '90vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 1,
              outline: 'none',
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                zIndex: 1,
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <Close />
            </IconButton>
            {selectedImage && (
              <>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={selectedImage.img}
                    alt={selectedImage.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 'calc(90vh - 4rem)',
                      display: 'block',
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      p: 1,
                      textAlign: 'center',
                    }}
                  >
                    {selectedImage.title}
                  </Typography>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                  >
                    <NavigateBefore />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                  >
                    <NavigateNext />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 300, mb: 6 }}>
          About Me
        </Typography>
        
        <Grid container spacing={6}>
          {/* Measurements */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.50' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
                Measurements
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(modelInfo.measurements).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {key}
                    </Typography>
                    <Typography variant="body1">
                      {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Experience */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.50' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
                Experience
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {modelInfo.experience.map((exp, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle1" color="primary">
                      {exp.year}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {exp.event}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, bgcolor: 'grey.100', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button
              startIcon={<Instagram />}
              href="https://instagram.com"
              target="_blank"
              sx={{ mx: 1 }}
            >
              Instagram
            </Button>
            <Button
              startIcon={<Facebook />}
              href="https://facebook.com"
              target="_blank"
              sx={{ mx: 1 }}
            >
              Facebook
            </Button>
            <Button
              startIcon={<LinkedIn />}
              href="https://linkedin.com"
              target="_blank"
              sx={{ mx: 1 }}
            >
              LinkedIn
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} {modelInfo.name}. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SimpleApp; 