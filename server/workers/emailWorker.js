require('dotenv').config();
const { emailQueue } = require('../config/queue');
const processEmail = require('../processors/emailProcessor');
const { queueEmail } = require('../services/emailService');

// Process email jobs
emailQueue.process(async (job) => {
  return processEmail(job);
});

// Handle failed jobs
emailQueue.on('failed', async (job, error) => {
  console.error(`Job ${job.id} failed:`, error);

  // Send notification to admin about failed job
  if (job.attemptsMade >= job.opts.attempts) {
    try {
      await queueEmail({
        email: process.env.ADMIN_EMAIL,
        subject: 'Email Queue Job Failed',
        template: 'emailError',
        data: {
          jobId: job.id,
          error: error.message,
          originalEmail: job.data.email,
          originalSubject: job.data.subject,
          attempts: job.attemptsMade
        }
      });
    } catch (notificationError) {
      console.error('Failed to send error notification:', notificationError);
    }
  }
});

// Monitor queue health
setInterval(async () => {
  try {
    const jobCounts = await emailQueue.getJobCounts();
    console.log('Queue status:', jobCounts);

    // Alert if too many failed jobs
    if (jobCounts.failed > 10) {
      await queueEmail({
        email: process.env.ADMIN_EMAIL,
        subject: 'Email Queue Alert: High Failure Rate',
        template: 'queueAlert',
        data: {
          failedCount: jobCounts.failed,
          waitingCount: jobCounts.waiting,
          activeCount: jobCounts.active
        }
      });
    }
  } catch (error) {
    console.error('Queue monitoring error:', error);
  }
}, 5 * 60 * 1000); // Check every 5 minutes

console.log('Email worker started'); 