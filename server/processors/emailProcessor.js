const sendEmail = require('../config/email');

const processEmail = async (job) => {
  const { email, subject, template, data } = job.data;
  
  try {
    const result = await sendEmail({
      email,
      subject,
      template,
      data
    });

    if (!result) {
      throw new Error('Email sending failed');
    }

    return { success: true };
  } catch (error) {
    console.error('Email processing error:', error);
    throw error;
  }
};

module.exports = processEmail; 