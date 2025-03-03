const axios = require('axios');
const admin = require('firebase-admin');
const db = admin.firestore();

const CAMVAS_API_URL = "https://canvas.instructure.com/api/v1";
const CAMVAS_ACCESS_TOKEN = "YOUR_CANVAS_ACCESS_TOKEN"; //store securely

//fetch assign. from canvas
exports.syncCanvasTasks = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if(!userId || courseId) {
      return res.status(400).json({ error: "User ID and Course ID are required" });
    }

  //fetch assign from canvas
  const response = await axios.get(`${CANVAS_API_URL}/courses/${courseId}/assignments`, {
      headers: { Authorization: `Bearer ${CANVAS_ACCESS_TOKEN}` },
    });

    const assignments = response.data;

    if (!assignments.length) {
      return res.json({ message: "No assignments found in Canvas." });
    }

    const userTasksRef = db.collection("tasks").where("userId", "==", userId);
    const existingTasksSnapshot = await userTasksRef.get();
    const existingTaskTitles = existingTasksSnapshot.docs.map(doc => doc.data().title);

    // Add new assignments to Firebase if not already added
    const batch = db.batch();
    assignments.forEach((assignment) => {
      if (!existingTaskTitles.includes(assignment.name)) {
        const taskRef = db.collection("tasks").doc();
        batch.set(taskRef, {
          userId,
          title: assignment.name,
          description: assignment.description || "No description provided.",
          dueDate: assignment.due_at,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });

    await batch.commit();

    res.json({ message: "Tasks successfully synced from Canvas!" });
  } catch (error) {
    console.error("Error syncing Canvas tasks:", error);
    res.status(500).json({ error: error.message });
  }
};
