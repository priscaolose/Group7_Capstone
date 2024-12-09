import { db } from "../src/firebase/firebaseConfig.js";
import { collection, getDoc, query, where, } from 'firebase/firestore';
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/dropDownGetTask", async (req, res) => {
     console.log("Request Received");

     const { taskName } = req.query;
     if(!taskName)
     {
          return res.status(400).json({ error: "Task Name not Provided" });
     }

     try{
          const tasksRef = collection(db, "tasks");
          const q = query(tasksRef, where('taskName', '==', taskName));
          const taskSnapshot = await getDoc(q);
          if(taskSnapshot.empty){
               return res.status(404).json({ message: "User not found" });
          }
          const task = taskSnapshot;
          res.json(task);
     }catch(error){
          console.log(error);
          res.status(500).json({ error: "Error getting user" });
     }
});
