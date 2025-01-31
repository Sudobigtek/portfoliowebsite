// Add route-based code splitting
const Portfolio = React.lazy(() => import('../pages/Portfolio'));
const About = React.lazy(() => import('../pages/About'));

// Add image preloading
const preloadImages = (images) => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}; 