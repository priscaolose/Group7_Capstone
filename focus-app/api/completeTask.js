import { db } from "../src/firebase/firebaseConfig.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/completeTask", async (req, res) => {
  console.log("Request received");

  const { taskID, completed } = req.query;
  console.log("Received: taskID: " + taskID);
  if(!taskID){
    return res.status(400).json({ error: "Missing taskID in query" });
  }

  // Update Data
  try {
    const taskRef = doc(db, "tasks", taskID);
    const taskSnapshot = await getDoc(taskRef);

    console.log("Check if the snapshot is empty");
    if (!taskSnapshot.exists()) {
        console.log("Snapshot is empty");
      return res.json({ error: "Task not found" });
    }
    console.log("Got task");

    if(taskSnapshot.data().completed)
    {
      await updateDoc(taskRef, {
        completed: false,
      });
    }else{
      await updateDoc(taskRef, {
        completed: true,
      });
  
    }

    res.status(200).json({ message: "Task toggled successfully!" });
  } catch (error) {
    console.error("Error toggling task:", error);
    res.status(500).json({ error: "Failed to toggle task" });
  }
});

export default function handler(req, res) {
  app(req, res);
}
