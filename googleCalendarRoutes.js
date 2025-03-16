const express = require('express');
const router = express.Router();
const googleCalendarController = require('../controllers/googleCalendarController');

router.post('/events', googleCalendarController.getCalendarEvents);
router.post('/events/add', googleCalendarController.addCalendarEvent);

module.exports = router;
