//src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signout } from "firebase/auth";
import { auth } from './firebaseConfig';

const auth = getAuth(app);

//signup func
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCrendential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

//login func
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

//logout func
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
