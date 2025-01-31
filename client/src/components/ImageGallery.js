import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  IconButton, 
  Typography,
  Dialog,
  DialogContent,
  Button,
  Stack
} from '@mui/material';
import { 
  ZoomIn, 
  ZoomOut, 
  Close, 
  Download,
  Share,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Features to add:
- Image zoom/pan in lightbox
- Swipe gestures for mobile
- Keyboard navigation
- Image download option
- Share buttons 

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  const handleDownload = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.title || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            layout
            whileHover={{ scale: 1.02 }}
            onClick={() => handleImageClick(image, index)}
          >
            <Box
              component="img"
              src={image.url}
              alt={image.title}
              sx={{
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
                borderRadius: 1,
                mb: 2
              }}
            />
          </motion.div>
        ))}
      </Masonry>

      <Dialog
        fullScreen
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        onKeyDown={handleKeyDown}
      >
        <DialogContent 
          sx={{ 
            p: 0, 
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1
            }}
          >
            <IconButton onClick={() => handleDownload(selectedImage)}>
              <Download />
            </IconButton>
            <IconButton onClick={() => handleShare(selectedImage)}>
              <Share />
            </IconButton>
            <IconButton onClick={() => setSelectedImage(null)}>
              <Close />
            </IconButton>
          </Stack>

          <IconButton
            onClick={handlePrev}
            sx={{ position: 'fixed', left: 16 }}
          >
            <NavigateBefore />
          </IconButton>

          <TransformWrapper>
            {({ zoomIn, zoomOut }) => (
              <>
                <TransformComponent>
                  {selectedImage && (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage.url}
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          maxHeight: '90vh',
                          maxWidth: '90vw',
                          objectFit: 'contain'
                        }}
                      />
                    </AnimatePresence>
                  )}
                </TransformComponent>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'fixed',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <IconButton onClick={() => zoomOut()}>
                    <ZoomOut />
                  </IconButton>
                  <IconButton onClick={() => zoomIn()}>
                    <ZoomIn />
                  </IconButton>
                </Stack>
              </>
            )}
          </TransformWrapper>

          <IconButton
            onClick={handleNext}
            sx={{ position: 'fixed', right: 16 }}
          >
            <NavigateNext />
          </IconButton>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .masonry-grid {
          display: flex;
          width: auto;
          margin-left: -16px;
        }
        .masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </>
  );
};

export default ImageGallery; 