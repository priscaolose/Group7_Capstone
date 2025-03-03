const express = require('express');
const router = express.Router();
const popoutController = require('../controllers/popoutController');

//routes for managing pop out window sessions
router.post('/open', popoutController.openPopout);
router.get('/:userId', popoutController.getPopouts);
router.put('/update/:popoutId', popoutController.updatePopout);
router.delete('/close/:popoutId', popoutController.closePopout);

//timer specific routes
router.post('/timer/open', popoutController.openTimerPopout);
router.get('/timer/:userId', popoutController.getActiveTimerPopout);
router.delete('/timer/close/:userId', popoutController.closeTimerPopout);

module.exports = router;
