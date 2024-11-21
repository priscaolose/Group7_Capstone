//deduct points from user
exports.deductPoints = async (req, res) => {
  const { userId, points } = req.body;

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      return res.status(404).send({ message: "User not found" });
    }

    const currentPoints = userDoc.data().rewardPoints || 0;

    if(currentPoints < points) {
      return res.status(400).send({ message: "Insufficient points" });
    }

    await userRef.update({
      rewardPooints: currentPoints - points
    });

    res.status(200).send({ message: "Points deducted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
