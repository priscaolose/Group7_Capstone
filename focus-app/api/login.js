import { db } from "../src/firebase/firebaseConfig";
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/login", async (req, res) => {
  const { email } = req.query;
  console.log("Request received");

  try {
    // Get a reference to the database
    const usersRef = db.collection("Users");

    // Check if user email is in database
    const emailSnapshot = await usersRef.where("email", "==", email).get();
    if (emailSnapshot.empty) {
      return res.json({ error: "User not found" });
    }
    console.log("Got user from email");

    // Get user data
    console.log("Getting user");
    let userData;
    emailSnapshot.forEach((doc) => {
      userData = doc.data();
    });
    // Return user first name
    console.log("Name: " + userData.firstName);
    res.status(200).json({ name: userData.firstName });
  } catch (error) {
    res.json({ error: "Failed to sign in:" + error });
  }
});

export default function handler(req, res) {
  app(req, res);
}
