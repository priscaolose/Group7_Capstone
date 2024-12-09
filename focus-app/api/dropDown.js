import { db } from "../src/firebase/firebaseConfig.js";
import { collection, getDocs, query, where, } from 'firebase/firestore';
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/dropDown", async (req, res) => {
     console.log("Request Received");

     const { userID } = req.query;
     if(!userID)
     {
          return res.status(400).json({ error: "Missing userID" });
     }

     try{
          const tasksRef = collection(db, "tasks");
          const q = query(tasksRef, where('userId', '==', String(userID)));
          const tasks = await getDocs(q);
          if(tasks.empty){
               return res.status(404).json({ message: "User not found" });
          }
          const taskNames = tasks.docs.map(doc => doc.data().taskName);
          res.json(taskNames);
     }catch(error){
          console.log(error);
          res.status(500).json({ error: "Error getting user" });
     }
});

export default function handler(req, res) {
     app(req, res);
 }