//rewardController
const { db } = require(./firebaseConfig");

//add reward points to user
exports.addPoints = async (req, res) => {
  const { userId, points } = req.body;

  try { 
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      return res.status(404).send({ message: "User not found" });
    }

    const currentPoints = userDoc.data().rewardPoints || 0;
    await userRef.update({
      rewardPoints: currentPoints + points
    });

    res.status(200).send({ message: "Points added succcessfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
}
