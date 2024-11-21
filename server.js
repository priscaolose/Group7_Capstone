//server.js
const express = require("express");
const rewardController = require("./rewardController");

const app = express();
app.use(express.json());

//routes
app.post("/addPoints", rewardController.addPoints);
app.post("/deductPoints", rewardController.deductPoints);
app.get("/getPoints/:userId", rewardController.getPoints);
app.post("/redeemReward", rewardController.redeemReward);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
