const express = require('express');
const router = express.Router();
const popoutController = require('../controllers/popoutController');
const popoutController = require('../controllers/popoutController');

//routes for managing pop out window sessions
router.post('/open', popoutController.openPopout);
router.get('/:userId', popoutController.getPopouts);
router.put('/update/:popoutId', popoutController.updatePopout);
router.delete('/close/:popoutId', popoutController.closePopout);

module.exports = router;
