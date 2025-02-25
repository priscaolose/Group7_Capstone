import { db } from "../src/firebase/firebaseConfig.js";
import { collection, getDocs, orderBy, query, where, } from 'firebase/firestore';
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getTask", async (req, res) =>{
    const { userID } = req.query;
    if(!userID)
    {
        return res.status(400).json({ error: "Missing userID" });
    }
    try{
        console.log("Got userID: " + userID);
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where('userId', '==', userID), orderBy("endTime", "desc"));
        const taskSnapshot = await getDocs(q);
        taskSnapshot.forEach(doc => console.log(doc.data().userID));
        taskSnapshot.docs.forEach(doc => console.log(doc.data()));

        if(taskSnapshot.empty){
            return res.status(404).json({ message: 'User not found' });
        }
        const tasks = taskSnapshot.docs.map(doc =>({
            taskName: doc.data().taskName,
            taskDescription: doc.data().taskDescription,
            dueDate: doc.data().endTime
        }));
        console.log("task info:" + tasks);
        res.status(200).json(tasks);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}