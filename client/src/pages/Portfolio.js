import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import { Close, ZoomIn } from '@mui/icons-material';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import { getOptimizedImageUrl, lazyLoadImage } from '../utils/imageUtils';
import Loading from '../components/Loading';
import OptimizedImage from '../components/OptimizedImage';

const Portfolio = () => {
  const [category, setCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample portfolio data (later will come from API)
  const portfolioItems = [
    {
      id: 1,
      title: 'Summer Campaign 2023',
      category: 'campaign',
      imageUrl: '/images/portfolio/campaign1.jpg',
      photographer: 'John Smith',
      client: 'Fashion Brand',
      date: '2023'
    },
    {
      id: 2,
      title: 'Editorial Shoot',
      category: 'editorial',
      imageUrl: '/images/portfolio/editorial1.jpg',
      photographer: 'Jane Doe',
      client: 'Vogue Magazine',
      date: '2023'
    },
    // Add more items...
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'campaign', label: 'Campaigns' },
    { value: 'editorial', label: 'Editorials' },
    { value: 'runway', label: 'Runway' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const filteredItems = category === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === category);

  // Add this schema in the Portfolio component
  const portfolioSchema = {
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: portfolioItems.map((item, index) => ({
        '@type': 'ImageObject',
        position: index + 1,
        name: item.title,
        description: `${item.category} - ${item.photographer}`,
        contentUrl: item.imageUrl
      }))
    }
  };

  // Add useEffect for loading state
  useEffect(() => {
    // Simulate loading for now (replace with actual API call later)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Add advanced filtering and sorting
  const advancedFilters = {
    year: ['2023', '2022', '2021'],
    location: ['New York', 'Paris', 'Milan'],
    photographer: ['John Doe', 'Jane Smith'],
    publication: ['Vogue', 'Elle', 'Harper's Bazaar']
  };

  // Add grid/list view toggle
  const viewOptions = ['grid', 'masonry', 'list'];

  return (
    <>
      <SEO 
        title="Portfolio"
        description="View my professional modeling portfolio including editorial work, runway shows, and commercial campaigns."
        image={portfolioItems[0]?.imageUrl || '/images/og-image.jpg'}
        type="website"
        schema={portfolioSchema}
      />
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Portfolio
        </Typography>

        {/* Category Filter */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={category}
            onChange={(_, newValue) => setCategory(newValue)}
            centered
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map(cat => (
              <Tab
                key={cat.value}
                label={cat.label}
                value={cat.value}
              />
            ))}
          </Tabs>
        </Box>

        {/* Portfolio Grid */}
        {loading ? (
          <Loading message="Loading portfolio..." />
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .zoom-icon': {
                        opacity: 1
                      }
                    }
                  }}
                  onClick={() => setSelectedImage(item)}
                >
                  <Box sx={{ position: 'relative', paddingTop: '133%' }}>
                    <OptimizedImage
                      src={item.imageUrl}
                      alt={item.title}
                      priority={item.id === 1}
                      quality={85}
                    />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Photographer: {item.photographer} • Date: {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Lightbox Dialog */}
        <Dialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            {selectedImage && (
              <>
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.7)'
                    }
                  }}
                >
                  <Close />
                </IconButton>
                <OptimizedImage
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  quality={100}
                  priority={true}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '90vh',
                    objectFit: 'contain'
                  }}
                />
                <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedImage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Photographer: {selectedImage.photographer}<br />
                    Client: {selectedImage.client}<br />
                    Date: {selectedImage.date}
                  </Typography>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Portfolio; 