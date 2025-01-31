// Simple image optimization utility
export const getOptimizedImageUrl = (url, { width, quality = 80 } = {}) => {
  if (!url) return '';
  
  // If using Cloudinary
  if (url.includes('cloudinary')) {
    const base = url.split('/upload/')[0];
    const fileName = url.split('/upload/')[1];
    return `${base}/upload/q_${quality},w_${width}/${fileName}`;
  }
  
  // For local images, return as is
  return url;
};

// Lazy loading helper
export const lazyLoadImage = (src, alt) => {
  return {
    src,
    alt,
    loading: 'lazy',
    onError: (e) => {
      e.target.src = '/images/placeholder.jpg';
    }
  };
}; 