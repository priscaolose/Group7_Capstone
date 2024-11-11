import express from "express";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/api/register", async (req, res) => {
  console.log("Request received");

  const { firstName, lastName, email, userName, phonenumber, password } = req.body;

  // Reference to database
  const userRef = collection(db, "Users");

  const saltRounds = 10;
  let hashpassword;

  // Hash password
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      hashpassword = hash;
    })
  })

  // Store data
  try {
    await addDoc(userRef, {
      firstName,
      lastName,
      email,
      phonenumber,
      hashpassword,
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
