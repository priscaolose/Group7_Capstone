import { db } from '../src/firebase-config';
import { ref, set, push } from 'firebase/database';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { fistName, lastName, email, userName, password } = req.body;
    const userRef = push(ref(db, 'Users'));

    set(userRef, {
      fistName,
      lastName,
      userName,
      email,
      password,
    });

    res.json({ message: 'User registered!' });
  }
}