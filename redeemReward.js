exports.redeemReward = async (req, res) => {
  const { userId, rewardId } = req.body;

  try {
    const userRef = db.collectiohn("users").doc(userId);
    const rewardRef = db.collection("rewards").doc(rewardId);

    const userDoc = await userRef.get();
    const rewardDoc = await rewardRef.get();

    if (!userDoc.exists || !rewardDoc.exists) {
      return res.status(404).send({ message: "User or Reward not found" });
    }

    const userPoints = userDoc.data().rewardPoints || 0;
    const rewardCost = rewardDoc.data().cost;

    if(userPoints < rewardCost) {
      return res.status(400).send({ message: "Insufficient points for this reward" });
    }

    //deduct points from log reward redemp.
    await userRef.update({
      rewardPoints: userPoints - rewardCost
    });

    await db.collection("redemptions").add({
      userId,
      rewardId,
      redeemAt: admin.firestore.Timestamp.now()
    });

    res.status(200).send({ message: "reward redeemed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
