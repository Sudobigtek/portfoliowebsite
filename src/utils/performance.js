import React from 'react';

export const preloadImages = (images) => {
  images.forEach(image => {
    const img = new Image();
    img.src = image;
  });
};

export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const getOptimizedImageUrl = (url, width = 800) => {
  // Add your image optimization logic here
  return `${url}?w=${width}&q=80`;
}; 