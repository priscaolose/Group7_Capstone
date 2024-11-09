import express from "express";
import { collection, addDoc } from "firebase/firestore";
import db from "../src/firebase/firebaseConfig"; // Firebase Firestore instance

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON payload

app.post("/api/register", async (req, res) => {
  console.log("Request received");

  const { firstName, lastName, email, userName, phonenumber, password } = req.body;

  // Correct usage of Firestore functions
  const userRef = collection(db); // Get reference to "Users" collection

  try {
    // Add a new document to the "Users" collection
    await addDoc(userRef, {
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
