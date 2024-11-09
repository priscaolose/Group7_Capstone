import { db } from '../../src/firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, userName, phonenumber, password } = req.body;
    const productsRef = collection(db, 'Users');

    try {
      await setDoc(doc(productsRef), { firstName, lastName, email, phonenumber, password, username: userName });
      res.status(200).json({ message: 'User registered!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
