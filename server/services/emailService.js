const nodemailer = require('nodemailer');
const { addEmailToQueue } = require('./emailQueueService');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (emailData) => {
  try {
    // Add to queue instead of sending directly
    await addEmailToQueue({
      ...emailData,
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`
    });
    return true;
  } catch (error) {
    console.error('Error queueing email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  transporter
}; 