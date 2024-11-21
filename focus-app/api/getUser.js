import { db } from "../src/firebase/firebaseConfig.js";
import { doc, getDoc } from 'firebase/firestore';
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getUser", async (req, res) =>{
    const { userID } = req.query;
    if(!userID)
    {
        return res.status(400).json({ error: "Missing userID" });
    }
    
    try{
        const userRef = doc(db, "Users", userID);
        if(!userRef.exists){
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await getDoc(userRef);

        const userData = user.data();

        res.status(200).json({ name: userData.firstName });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}