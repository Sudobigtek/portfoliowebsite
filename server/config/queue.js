const Queue = require('bull');
const Redis = require('ioredis');

// Redis configuration
const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
  password: process.env.REDIS_PASSWORD,
};

// Create Redis client
const client = new Redis(redisConfig);
const subscriber = new Redis(redisConfig);

// Create email queue
const emailQueue = new Queue('email', {
  redis: redisConfig,
  limiter: {
    max: 10, // Max number of jobs processed per
    duration: 1000 // time period in ms
  }
});

// Add queue events for monitoring
emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

emailQueue.on('error', (error) => {
  console.error('Queue error:', error);
});

module.exports = {
  emailQueue,
  client,
  subscriber
}; 