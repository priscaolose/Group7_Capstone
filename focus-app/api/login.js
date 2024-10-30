import { db } from '../src/firebase-config';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Query to find the user by email
      const emailQuery = query(ref(db, 'Users'), orderByChild('email'), equalTo(email));
      const emailSnapshot = await get(emailQuery);

      // Check if the user exists
      if (!emailSnapshot.exists()) {
        return res.json({ error: 'User not found' });
      }

      // Get the user data
      let userData;
      emailSnapshot.forEach((childSnapshot) => {
        userData = childSnapshot.val();
      });

      // Check if the password is correct
      const passwordMatch = password == userData.password;

      if (!passwordMatch) {
        return res.json({ error: 'Invalid password' });
      }

      // Successful login
      res.json({ message: 'Login successful' });
    } 
    catch (error) {
      res.json({ error: 'Failed to sign in' });
    }
  }
}