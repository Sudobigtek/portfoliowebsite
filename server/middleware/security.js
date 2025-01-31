const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Specific routes limiter
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: 'Too many login attempts, please try again after an hour'
});

const securityMiddleware = (app) => {
  // Security headers
  app.use(helmet());
  
  // CORS
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));

  // Data sanitization against XSS
  app.use(xss());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Rate limiting
  app.use('/api/', limiter);
  app.use('/api/auth/login', authLimiter);
  
  // Additional security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
};

module.exports = securityMiddleware; 