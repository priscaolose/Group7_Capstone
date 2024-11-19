import { db } from "../src/firebase/firebaseConfig";
const express = require('express');

const app = express();

app.get("/api/getUsers", async (req, res) =>{
    const { userID } = req.body;
    try{
        const usersRef = db.collection("Users");
        const userSnapshot = await usersRef.doc(userID);
        if(!userSnapshot.exists){
            return res.status(404).json({ message: 'User not found' });
        }
        let user;
        userSnapshot.forEach((childSnapshot) => {
            user = childSnapshot.val();
        });
        res.status(200).json({ name: user.firstName });
    }catch(error){
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}