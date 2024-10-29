import { db } from '../src/firebase-config';
import { ref, set } from 'firebase/database';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { fistName, lastName, email, userName, password } = req.body;

    set(ref(db, 'Users/' + userName), {
      fistName,
      lastName,
      email,
      password,
    });

    res.json({ message: 'User registered!' });
  }
}