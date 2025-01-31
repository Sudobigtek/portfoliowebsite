require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const { emailQueue } = require('./config/queue');
const setupDashboard = require('./config/dashboard');

const app = express();

// Trust proxy for rate limiting to work with reverse proxies
app.set('trust proxy', 1);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup queue dashboard
setupDashboard(app, [emailQueue]);

// Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 