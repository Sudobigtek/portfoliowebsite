const { exec } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const backupService = {
  async createDatabaseBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(__dirname, `../backups/db-${timestamp}.gz`);
    
    try {
      // Create MongoDB dump
      await new Promise((resolve, reject) => {
        exec(
          `mongodump --uri="${process.env.MONGO_URI}" --archive="${backupPath}" --gzip`,
          (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout);
          }
        );
      });

      // Upload to S3
      const fileStream = fs.createReadStream(backupPath);
      await s3.upload({
        Bucket: process.env.AWS_BACKUP_BUCKET,
        Key: `database/db-${timestamp}.gz`,
        Body: fileStream
      }).promise();

      // Cleanup local file
      fs.unlinkSync(backupPath);

      return {
        success: true,
        timestamp,
        path: `database/db-${timestamp}.gz`
      };
    } catch (error) {
      console.error('Backup failed:', error);
      throw error;
    }
  },

  async createMediaBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    try {
      // Get all media files from Cloudinary
      const { resources } = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'portfolio'
      });

      // Upload media inventory to S3
      await s3.upload({
        Bucket: process.env.AWS_BACKUP_BUCKET,
        Key: `media/inventory-${timestamp}.json`,
        Body: JSON.stringify(resources)
      }).promise();

      return {
        success: true,
        timestamp,
        count: resources.length
      };
    } catch (error) {
      console.error('Media backup failed:', error);
      throw error;
    }
  }
};

module.exports = backupService; 