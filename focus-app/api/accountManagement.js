import { initializeApp } from 'firebase/app';
import { getAuth, updateEmail, updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../src/firebase-config';

async function updateUserEmail(currentEmail, currentPassword, newEmail) {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(currentEmail, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { email: newEmail });

    console.log("Email updated successfully.");
  } catch (error) {
    console.error("Error updating email:", error);
  }
}

async function updateUserPassword(currentEmail, currentPassword, newPassword) {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(currentEmail, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    console.log("Password updated successfully.");
  } catch (error) {
    console.error("Error updating password:", error);
  }
}

async function updateUserProfile({ firstName, lastName, username }) {
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is signed in.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", user.uid);
    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (username) updates.username = username;

    await updateDoc(userDocRef, updates);
    console.log("User profile updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

async function updateUserPhoneNumber(phoneNumber) {
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is signed in.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { phoneNumber });
    console.log("Phone number updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating phone number:", error);
  }
}