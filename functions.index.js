const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createTask = functions.https.onCall(async (data, context) => {
  const { userId, taskName, startTime, endTime } = data;

  try {
    const taskRef = await db.collection("tasks").add({
      userId, 
      taskName, 
      startTime,
      endTime,
      completed: false,
    });
    return { taskId: taskref.id };
  } catch (error) {
    throw new functions.https.HttpsError("failed-precondition", error.message);
  }
});
