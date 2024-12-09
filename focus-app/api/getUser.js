import { db } from "../src/firebase/firebaseConfig.js";
import { doc, getDoc } from 'firebase/firestore';
import express from "express";
import fetch from 'node-fetch'; // Import the polyfill for fetch
import { Headers, Response } from 'node-fetch'; // Optionally import Headers and Response

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getUser", async (req, res) => {
    const { userID } = req.query;
    if (!userID) {
        return res.status(400).json({ error: "Missing userID" });
    }
    
    try {
        console.log("Getting user, userID: " + userID);
        const userRef = doc(db, "Users", userID);
        const user = await getDoc(userRef);
        if (!user.exists()) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("Got user");

        const userData = user.data();
        res.status(200).json({ name: userData.firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting user' });
    }
});

export default function handler(req, res) {
    app(req, res);
}
