import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const storeUserInDatabase = async (user) => {
  const userDocRef = doc(db, "users", user.uid); 

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
  try {
    await setDoc(userDocRef, userData, { merge: true }); 
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error; 
  }
};

export default storeUserInDatabase;  