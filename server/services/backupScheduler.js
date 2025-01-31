const Queue = require('bull');
const backupService = require('./backupService');

const backupQueue = new Queue('backup', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  }
});

// Process backup jobs
backupQueue.process('database', async (job) => {
  try {
    const result = await backupService.createDatabaseBackup();
    return result;
  } catch (error) {
    console.error('Database backup failed:', error);
    throw error;
  }
});

backupQueue.process('media', async (job) => {
  try {
    const result = await backupService.createMediaBackup();
    return result;
  } catch (error) {
    console.error('Media backup failed:', error);
    throw error;
  }
});

// Schedule backups
const scheduleBackups = () => {
  // Database backup every day at 2 AM
  backupQueue.add('database', {}, {
    repeat: { cron: '0 2 * * *' }
  });

  // Media backup every Sunday at 3 AM
  backupQueue.add('media', {}, {
    repeat: { cron: '0 3 * * 0' }
  });
};

// Handle failed jobs
backupQueue.on('failed', (job, err) => {
  console.error(`Backup job ${job.id} failed:`, err);
  // Send notification to admin
});

module.exports = {
  backupQueue,
  scheduleBackups
}; 