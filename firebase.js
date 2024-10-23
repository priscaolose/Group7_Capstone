//firebase.js

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

//ini. firebase admin SDK
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//firebase services
const auth = getAuth();
const db = getFirestore();

module.exports = { auth, db };
