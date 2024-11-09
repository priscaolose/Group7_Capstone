// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPUgR0RXQlEHXzaB18YF0PNdUblJmO0Es",
  authDomain: "focus-project-2502d.firebaseapp.com",
  databaseURL: "https://focus-project-2502d-default-rtdb.firebaseio.com",
  projectId: "focus-project-2502d",
  storageBucket: "focus-project-2502d.appspot.com",
  messagingSenderId: "415204985910",
  appId: "1:415204985910:web:dd15035e5166595fb19c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  

export default app;
module.exports = db;
export {auth};
