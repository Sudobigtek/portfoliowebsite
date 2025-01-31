const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after an hour'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 3, // limit each IP to 3 password reset attempts per hour
    message: {
        success: false,
        message: 'Too many password reset attempts. Please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    contactLimiter,
    passwordResetLimiter
}; 