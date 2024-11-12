import { db } from "../src/firebase/firebaseConfig";
import express from "express";
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get a reference to the database
    const usersRef = db.collection("Users");

    // Check if user email is in database
    const emailSnapshot = await usersRef.where("email", "==", email).get();
    if (emailSnapshot.empty) {
      return res.json({ error: "User not found" });
    }

    // Get user data
    let userData;
    emailSnapshot.forEach((childSnapshot) => {
      userData = childSnapshot.val();
    });

    // Check if password is correct
    bcrypt.compare(password, userData.password, function(err, result){
      if(result === false)
      {
        return res.json({ error: "Invalid password" });
      }
      if(result === true)
      {
        res.json({ message: "Login successful" });
      }
    });

  } catch (error) {
    res.json({ error: 'Failed to sign in' });
  }
});

export default function handler(req, res) {
  app(req, res);
}