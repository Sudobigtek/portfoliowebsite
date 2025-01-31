const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials from environment variables
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const calendarService = {
  addEvent: async (booking) => {
    try {
      const event = {
        summary: `Photoshoot - ${booking.type}`,
        description: `
          Client: ${booking.name}
          Email: ${booking.email}
          Phone: ${booking.phone}
          Details: ${booking.details}
        `,
        start: {
          dateTime: new Date(booking.date),
          timeZone: 'UTC'
        },
        end: {
          dateTime: new Date(new Date(booking.date).getTime() + 2 * 60 * 60 * 1000), // 2 hours duration
          timeZone: 'UTC'
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 } // 1 hour before
          ]
        }
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.data;
    } catch (error) {
      console.error('Calendar event creation failed:', error);
      throw error;
    }
  },

  updateEvent: async (eventId, booking) => {
    try {
      const event = {
        summary: `Photoshoot - ${booking.type}`,
        description: `
          Client: ${booking.name}
          Email: ${booking.email}
          Phone: ${booking.phone}
          Details: ${booking.details}
          Status: ${booking.status}
        `,
        start: {
          dateTime: new Date(booking.date),
          timeZone: 'UTC'
        },
        end: {
          dateTime: new Date(new Date(booking.date).getTime() + 2 * 60 * 60 * 1000),
          timeZone: 'UTC'
        }
      };

      const response = await calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event
      });

      return response.data;
    } catch (error) {
      console.error('Calendar event update failed:', error);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
      });
    } catch (error) {
      console.error('Calendar event deletion failed:', error);
      throw error;
    }
  }
};

module.exports = calendarService; 