// src/firebase-auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import app from './firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log("User Info:", user);
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const signUpWithGoogle = async () => {
  try {
    await signUpWithGoogle();
  } catch (error) {
    console.error("Google sign-up failed:", error);
  }
};

export {auth,provider}
