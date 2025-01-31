import React, { useState } from 'react';
import { Grid, Box, Modal } from '@mui/material';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              component="img"
              src={image.url}
              alt={image.alt}
              onClick={() => handleImageClick(image)}
              sx={{
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Modal open={!!selectedImage} onClose={handleClose} aria-labelledby="image-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        >
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage.url}
              alt={selectedImage.alt}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageGallery;
