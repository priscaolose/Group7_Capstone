// src/firebase-auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from './firebaseConfig'; // Use values from firebaseConfig

// Google sign-in function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result; // Returning the result to be used in handleGoogleSignUp
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

// Check if the email already exists in the database
const checkIfEmailExists = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // If not empty, the email exists
};

// Store the new user in the Firestore database
const storeUserInDatabase = async (user) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("displayName", "==", user.displayName));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert(`A user with the name ${user.displayName} already exists.`);
      throw new Error(`A user with the name "${user.displayName}" already exists.`);
    }

    // Proceed to store the new user if no conflict
    const userDocRef = doc(db, "Users", user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    await setDoc(userDocRef, userData, { merge: true });
    console.log("User successfully stored in the database");

  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

// Handle Google sign-up logic, including checking if email exists
export const handleGoogleSignUp = async () => {
  const navigate = useNavigate(); // Use navigate inside the component or handler
  try {
    const result = await signInWithGoogle();
    
    // Check if the email already exists in the database
    const emailExists = await checkIfEmailExists(result.user.email);
    if (emailExists) {
      // If email already exists, alert the user and navigate to login
      alert('Email already exists. Please sign in instead.');
      navigate('/login'); // Redirect to login page
      return; // Exit the function early
    }

    // If the user doesn't exist, store the user in the database
    if (result.user) {
      console.log('Signed Up With Google Clicked', result.user.email);
      await storeUserInDatabase(result.user);
      navigate('/addTask', { state: { email: result.user.email } }); // Redirect to add task page
    }
  } catch (error) {
    console.error("Error during Google Sign-Up:", error);
  }
};

// Export necessary values
export { auth, provider };
