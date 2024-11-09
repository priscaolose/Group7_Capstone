import { db } from '../src/firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { firstName, lastName, email, userName, phonenumber, password } = req.body;
    const productsRef = collection(db, 'Users');

    try{
      await setDoc(doc(productsRef), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phonenumber: phonenumber,
        password: password,
        username: userName,
      });

    /*try {
      userRef.set( {
        firstName,
        lastName,
        userName,
        email,
        phonenumber,
        password,
      });*/
  
      res.json({ message: 'User registered!' });
    } catch (error)
    {
      res.json({ error: 'Failed to register '})
    }
  }
}