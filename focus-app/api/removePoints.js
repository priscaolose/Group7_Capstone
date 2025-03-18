import { db } from "../src/firebase/firebaseConfig.js";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/removePoints", async (req, res) => {
  console.log("Request received");

  const { userID, points } = req.query;
  console.log("Received: userID: " + userID + ", Points: " + points);

  // Update Data
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("email", "==", userID));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return res.json({ error: "User not found" });
    }
    console.log("Got user from email");

    let userData;
    const userDoc = userSnapshot.docs[0];
    if(userDoc.data().points < points)
    {
      return res.json({ error: "User does not have enough points" });
    }
    const newPoints = userDoc.data().points - Number(points);
    await updateDoc(userDoc.ref, {
      points: newPoints,
    });
    console.log("User Points: " + userData);

    res.status(200).json({ message: "Points removed successfully!" });
  } catch (error) {
    console.error("Error removing points:", error);
    res.status(500).json({ error: "Failed to remove points" });
  }
});

export default function handler(req, res) {
  app(req, res);
}
