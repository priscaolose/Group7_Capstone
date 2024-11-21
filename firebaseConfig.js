//firebaseConfig.js
const admin = require("firebase-admin");

//ini. firebase admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: /* "https// */ //find the project id
});

const db = admin.firestore();
module.exports = { admin, db };
