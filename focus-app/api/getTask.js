import { db } from "../src/firebase/firebaseConfig.js";
import { collection, getDoc, orderBy, query, where, } from 'firebase/firestore';
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getTasks", async (req, res) =>{
    const { userID } = req.query;
    if(!userID)
    {
        return res.status(400).json({ error: "Missing userID" });
    }
    try{
        const tasksRef = collection(db, "Tasks");
        const q = query(tasksRef, where('userID', '==', userID), orderBy('dueDate'));
        const taskSnapshot = await getDoc(q);
        if(!taskSnapshot.exists){
            return res.status(404).json({ message: 'User not found' });
        }
        const task = taskSnapshot.docs[0];
        res.status(200).json({ dueDate: task.dueDate, pointAmount: task.pointAmount, name: task.name, description: task.description, 
            status: task.status, taskID: task.taskID, userID: task.userID });
    }catch(error){
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}