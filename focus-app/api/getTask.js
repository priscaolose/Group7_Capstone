import { db } from "../src/firebase/firebaseConfig";
const express = require('express');

const app = express();

app.get("/api/getTasks", async (req, res) =>{
    const { userID } = req.body;
    try{
        const tasksRef = db.collection("Tasks");
        const taskSnapshot = await tasksRef.where('userID', '==', userID).orderBy('dueDate').get();
        if(!taskSnapshot.exists){
            return res.status(404).json({ message: 'User not found' });
        }
        let task;
        taskSnapshot.forEach((childSnapshot) => {
            task = childSnapshot.val();
        });
        res.status(200).json({ dueDate: task.dueDate, pointAmount: task.pointAmount, name: task.name, description: task.description, 
            status: task.status, taskID: task.taskID, userID: task.userID });
    }catch(error){
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}