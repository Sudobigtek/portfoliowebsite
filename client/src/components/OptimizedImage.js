import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  quality = 75,
  priority = false,
  ...props
}) => {
  const [loading, setLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    if (!src) return;

    // Generate optimized image URL
    const url = new URL(src);
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('w', width?.toString() || 'auto');
    if (height) url.searchParams.set('h', height.toString());
    
    setOptimizedSrc(url.toString());
  }, [src, quality, width, height]);

  if (error) {
    return (
      <Box
        sx={{
          width: width || '100%',
          height: height || '100%',
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Error loading image
      </Box>
    );
  }

  return (
    <>
      {loading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || '100%'}
          animation="wave"
        />
      )}
      <LazyLoadImage
        src={optimizedSrc}
        alt={alt}
        effect="blur"
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        {...props}
      />
    </>
  );
};

export default OptimizedImage; 