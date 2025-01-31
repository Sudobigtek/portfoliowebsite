const getPasswordResetTemplate = (resetUrl, userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #000000;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello${userName ? ` ${userName}` : ''},</p>
          <p>You are receiving this email because a password reset was requested for your account.</p>
          <p>Please click the button below to reset your password. This link will expire in 10 minutes.</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
          <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Your Model Portfolio. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getContactFormTemplate = (contactData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          color: #666666;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <p class="label">Name:</p>
            <p>${contactData.name}</p>
          </div>
          <div class="field">
            <p class="label">Email:</p>
            <p>${contactData.email}</p>
          </div>
          <div class="field">
            <p class="label">Subject:</p>
            <p>${contactData.subject}</p>
          </div>
          <div class="field">
            <p class="label">Message:</p>
            <p>${contactData.message}</p>
          </div>
          <div class="field">
            <p class="label">IP Address:</p>
            <p>${contactData.ipAddress}</p>
          </div>
          <div class="field">
            <p class="label">Submission Time:</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated message from your Model Portfolio website.</p>
          <p>&copy; ${new Date().getFullYear()} Your Model Portfolio. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getContactAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Message</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
          <p>This is an automated response to confirm that your message has been received successfully.</p>
          <p>Best regards,<br>Your Model Portfolio Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Your Model Portfolio. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getEmailErrorTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
        }
        .error {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
          padding: 15px;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Queue Job Failed</h1>
        </div>
        <div class="content">
          <div class="error">
            <p><strong>Job ID:</strong> ${data.jobId}</p>
            <p><strong>Error:</strong> ${data.error}</p>
            <p><strong>Original Email:</strong> ${data.originalEmail}</p>
            <p><strong>Original Subject:</strong> ${data.originalSubject}</p>
            <p><strong>Attempts Made:</strong> ${data.attempts}</p>
          </div>
          <p>Please check the queue dashboard for more details and to retry the job if needed.</p>
        </div>
        <div class="footer">
          <p>This is an automated message from your email queue system.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const contactFormTemplate = (data) => `
<!DOCTYPE html>
<html>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
</body>
</html>
`;

const autoReplyTemplate = (name) => `
<!DOCTYPE html>
<html>
<body>
    <h2>Thank you for your message</h2>
    <p>Dear ${name},</p>
    <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
    <p>Best regards,<br>Model Name</p>
</body>
</html>
`;

const bookingConfirmationTemplate = (data) => `
<!DOCTYPE html>
<html>
<body>
    <h2>Booking Request Received</h2>
    <p>Dear ${data.name},</p>
    <p>Thank you for your booking request. Here are the details:</p>
    <ul>
        <li>Date: ${new Date(data.date).toLocaleDateString()}</li>
        <li>Type: ${data.type}</li>
    </ul>
    <p>We will review your request and get back to you shortly to confirm the booking.</p>
    <p>Best regards,<br>Model Name</p>
</body>
</html>
`;

const bookingRequestTemplate = (booking) => `
<!DOCTYPE html>
<html>
<body>
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
    <p><strong>Type:</strong> ${booking.type}</p>
    <p><strong>Details:</strong></p>
    <p>${booking.details}</p>
</body>
</html>
`;

const bookingStatusTemplate = (data) => `
<!DOCTYPE html>
<html>
<body>
    <h2>Booking ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</h2>
    <p>Dear ${data.name},</p>
    <p>Your booking for ${new Date(data.date).toLocaleDateString()} has been ${data.status}.</p>
    <p>Type: ${data.type}</p>
    ${data.status === 'confirmed' ? '<p>We will contact you with further details shortly.</p>' : ''}
    <p>Best regards,<br>Model Name</p>
</body>
</html>
`;

module.exports = {
  getPasswordResetTemplate,
  getContactFormTemplate,
  getContactAutoReplyTemplate,
  getEmailErrorTemplate,
  contactFormTemplate,
  autoReplyTemplate,
  bookingConfirmationTemplate,
  bookingRequestTemplate,
  bookingStatusTemplate
}; 