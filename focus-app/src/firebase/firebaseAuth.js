// src/firebase-auth.js
import {
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import app from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import { db } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("result.user.email", result.user.email);
    return result;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const checkIfEmailExists = async (email) => {
  try {
    const usersRef = collection(db, "Users");

    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with email:", email);
      return false;
    } else {
      querySnapshot.forEach((doc) => {
        console.log("User found:", doc.id, "=>", doc.data());
      });
      return true; // Email exists
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};

export const storeUserInDatabase = async (user) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("displayName", "==", user.displayName));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // If there is a user with the same name, throw an error
      alert(`A user with the Fname ${user.displayName} already exists.`);
      throw new Error(
        `A user with the name "${user.displayName}" already exists.`
      );
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

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Google sign-up error:", error);
    throw error;
  }
};

export const handleGoogleSignUp = async (navigate) => {
  try {
    const result = await signUpWithGoogle();

    const emailExists = await checkIfEmailExists(result.user.email);
    if (emailExists) {
      alert("Email already exists. Please sign in instead.");
      navigate("/login");
      return;
    }

    // If the user doesn't exist, store the user in the database
    if (result.user) {
      console.log("Signed Up With Google Clicked", result.user.email);
      await storeUserInDatabase(result.user);
      await getUsersName(result.user.email);
      navigate("/dashboard", { state: { email: result.user.email } }); // Redirect to add task page
    }
  } catch (error) {
    console.error("Error during Google Sign-Up:", error);
  }
};

export const getUsersName = async (email) => {
  try {
    // Get a reference to the database
    const usersRef = collection(db, "Users");

    // Create a query to find documents with the matching email
    const q = query(usersRef, where("email", "==", email));
    const emailSnapshot = await getDocs(q);

    if (emailSnapshot.empty) {
      console.log("Error getting user");
      return "error";
    }
    console.log("Got user from email");

    // Get user data
    console.log("Getting user");
    let userData;
    emailSnapshot.forEach((doc) => {
      userData = doc.data();
    });
    // Return user first name
    const firstName = userData.displayName.split(" ")[0];
    console.log("Name: " + firstName);
    return firstName;
  } catch (error) {
    console.error("Error getting users name");
  }
};

export { auth, provider };
