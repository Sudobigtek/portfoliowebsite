const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const emailQueue = new Queue('email', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  }
});

// Create Bull Board
const serverAdapter = new ExpressAdapter();
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

// Queue processor
emailQueue.process(async (job) => {
  const { to, subject, html, attachments } = job.data;
  try {
    await sendEmail({ to, subject, html, attachments });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
});

// Add retry logic
emailQueue.on('failed', async (job, err) => {
  if (job.attemptsMade < 3) {
    await job.retry();
  } else {
    // Send notification about failed email
    console.error(`Email to ${job.data.to} failed after 3 attempts:`, err);
  }
});

const addEmailToQueue = async (emailData) => {
  return await emailQueue.add(emailData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000 // 1s, then 2s, then 4s
    }
  });
};

module.exports = {
  emailQueue,
  serverAdapter,
  addEmailToQueue
}; 