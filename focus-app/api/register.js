import { db } from '../src/firebase-config';
//import { ref, set, push } from 'firebase/database';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { firstName, lastName, email, userName, phonenumber, password } = req.body;
    const ref = db.ref('server/saving-data/fireblog');
    const userRef = ref.child('Users');

    try {
      userRef.set({
        firstName : firstName,
        lastName : lastName,
        userName : userName,
        email : email,
        phonenumber : phonenumber,
        password : password,
      });
  
      res.json({ message: 'User registered!' });
    } catch (error)
    {
      res.json({ error: 'Failed to register '})
    }
  }
}