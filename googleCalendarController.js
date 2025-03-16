const { google } = require('googleapis');
const admin = require('firebase-admin');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI // Set this to your frontend callback URL
);

// Get Google Calendar events
exports.getCalendarEvents = async (req, res) => {
  try {
    const { accessToken } = req.body; // Retrieve user's OAuth token
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.json(events.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new event to Google Calendar
exports.addCalendarEvent = async (req, res) => {
  try {
    const { accessToken, event } = req.body;
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.json({ message: 'Event added successfully', event: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
