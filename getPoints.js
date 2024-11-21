//get users reward points
exports.getPooints = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: "User not found" });
    }

    const rewardPoints = userDoc.data().rewardPoints || 0;

    res.status(200).send({ rewardPoints });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
