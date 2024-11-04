import { db } from '../src/firebase-config';
import { ref, set, push } from 'firebase/database';
import admin from 'firebase-admin';

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://focus-project-2502d-default-rtdb.firebaseio.com/"
  });
}

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if(!token){
      return res.status(401).json({ error: 'No token' });
    }

    const { firstName, lastName, email, userName, phonenumber, password } = req.body;
    const userRef = push(ref(db, 'Users/'));
    await admin.auth().verifyIdToken(token);

    try {
      await set(userRef, {
        firstName,
        lastName,
        email,
        userName,
        phonenumber,
        password,
      });
  
      res.json({ message: 'User registered!' });
    } catch (error)
    {
      res.json({ error: 'Failed to register '})
    }
  }
}