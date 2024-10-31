// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);