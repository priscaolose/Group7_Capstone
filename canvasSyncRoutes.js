const express = require("express");
const router = express.Router();
const canvasSyncController = require("../controllers/canvasSyncController");

//route to sync Canvas tasks
router.post("/sync", canvasSyncController.syncCanvasTasks);

module.exports = router;
