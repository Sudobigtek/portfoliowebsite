import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  schema,
  language = 'en',
  author,
  publishedTime,
  modifiedTime,
  canonicalUrl,
  noindex,
  themeColor = '#000000',
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://sudobigtek.github.io/portfoliowebsite';
  const fullImageUrl = image ? `${siteUrl}${image}` : null;
  const pageUrl = url || siteUrl;
  const canonical = canonicalUrl || pageUrl;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      <meta name="theme-color" content={themeColor} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Robots meta tag */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph meta tags */}
      <meta property="og:site_name" content={title.split(' | ')[1] || title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
      {fullImageUrl && <meta property="og:image:alt" content={title} />}
      {language && <meta property="og:locale" content={language} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImageUrl && <meta name="twitter:image" content={fullImageUrl} />}
      {fullImageUrl && <meta name="twitter:image:alt" content={title} />}

      {/* Pinterest verification */}
      {process.env.REACT_APP_PINTEREST_VERIFICATION && (
        <meta name="p:domain_verify" content={process.env.REACT_APP_PINTEREST_VERIFICATION} />
      )}

      {/* LinkedIn meta tags */}
      <meta property="linkedin:title" content={title} />
      <meta property="linkedin:description" content={description} />
      {fullImageUrl && <meta property="linkedin:image" content={fullImageUrl} />}

      {/* Apple mobile web app meta tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={title} />

      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content={themeColor} />
      {fullImageUrl && <meta name="msapplication-image" content={fullImageUrl} />}

      {/* Schema.org structured data */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={themeColor} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  url: PropTypes.string,
  schema: PropTypes.object,
  language: PropTypes.string,
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  canonicalUrl: PropTypes.string,
  noindex: PropTypes.bool,
  themeColor: PropTypes.string,
};

SEO.defaultProps = {
  keywords: [],
  image: null,
  url: '',
  schema: null,
  language: 'en',
  author: null,
  publishedTime: null,
  modifiedTime: null,
  canonicalUrl: null,
  noindex: false,
  themeColor: '#000000',
};

export default SEO;
