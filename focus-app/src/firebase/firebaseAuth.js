// src/firebase-auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail 
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import app from './firebaseConfig';
import  storeUserInDatabase from './storeGoogleSignup' 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, provider);
      await storeUserInDatabase(result.user);
      return result
    } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const signUpWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth,provider);
      return result;
  } catch (error) {
      console.error('Google sign-up error:', error);
      throw error;  // Propagate error to handle in calling function
  }
};

export {auth,provider}
