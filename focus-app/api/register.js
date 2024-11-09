import express from "express";
import { collection, set } from "firebase/firestore";
import db from "../src/firebase/firebaseConfig";

const app = express();
app.use(express.json());

app.post("/api/register", async (req, res) => {
  console.log("Request received");

  const { firstName, lastName, email, userName, phonenumber, password } = req.body;

  const userRef = db.collection("Users").doc();

  try {
    await userRef.set({
      firstName,
      lastName,
      email,
      phonenumber,
      password,
      username: userName,
    });

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

export default function handler(req, res) {
  app(req, res);
}
