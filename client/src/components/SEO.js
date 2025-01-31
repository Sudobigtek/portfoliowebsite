// Need to implement:
- Meta tags management
- Structured data for better SEO
- Image optimization
- Performance optimization
- Social media meta tags 

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, schema }) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://sudobigtek.github.io/portfoliowebsite';

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

SEO.defaultProps = {
  title: 'Professional Model Portfolio',
  description: 'Professional model available for fashion shows, photo shoots, and brand campaigns.',
  image: '/images/default-og.jpg',
  schema: null
};

export default SEO; 