import express from "express";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";

const app = express();

app.post("/api/setNotes", async (req, res) =>{
    console.log("request received");

    const { userName, note } = req.body;

    const userRef = collection(db, "Notes");

    try {
        await addDoc(userRef, {
          userName,
          note
        });
    
        res.status(200).json({ message: "Note added successfully!" });
      } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Failed to add note" });
      }
});

export default function handler(req, res) {
    app(req, res);
}
  