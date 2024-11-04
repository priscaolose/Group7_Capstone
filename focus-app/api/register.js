import { db } from '../src/firebase-config';
import { ref, set, push } from 'firebase/database';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { firstName, lastName, email, userName, phonenumber, password } = req.body;
    const userRef = push(ref(db, `Users/${userName}`));

    try {
      await set(userRef, {
        firstName,
        lastName,
        email,
        phonenumber,
      });
  
      res.json({ message: 'User registered!' });
    } catch (error)
    {
      res.json({ error: 'Failed to register '})
    }
  }
}