const admin = require('firebase-admin');
const db = admin.firestore();
const popoutsCollection = db.collection('popouts');

//open pop out window
exports.openPopout = async (req, res) => {
  try {
    const { userId, type, data } = req.body; //type: task, timer, etc.
    if(type === 'timer') {
      const existingTimer = await popoutsCollection
        .where('userId', '==', userId)
        .where('type', '==', 'timer')
        .get();

      if(!existingTimer.empty) {
        return res.status(400).json({ message: 'A timer pop-out is already active.' });
      }
    }
    const popoutRef = await popoutsCollection.add({
      userId, 
      type,
      data,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ popoutId: popoutRef.id, message: 'Pop-out window opened' });
  }  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all pop out windows for user
exports.getPopouts = async (req, res) => {
  try { 
  const { userId } = req.params;
  const snapshot = await popoutsCollection.where('userId', '==', userId).get();
  const popouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(popouts);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
};

//get active timer popout for user (if exists)
exports.getActiveTimerPopout = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await popoutsCollection
      .where('userId', '==', userId)
      .where('type', '==', 'timer')
      .get();

    if(snapshot.empty) {
      return res.status(200).json({ active: false, message: 'No active timer pop-out' });
    }

    const popout = snapshot.docs[0].data();
    res.json({ active: true, popout });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

//update pop out window state
exports.updatePopout = async (req, res) => {
  try { 
  const { popoutId } = req.params;
  const { data } = req.body;
  await popoutsCollection.doc(popoutId).update({ data });
  res.json({ message: 'Pop-out window updated' });
  } catch (error) { 
  res.status(500).json({ error: error.message });
  }
};

//close a pop out window
exports.closePopout = async (req, res) => {
  try { 
  const { popoutId } = req.params;
  await popoutsCollection.doc(popoutId).delete();
  res.json({ message: 'Pop-out window closed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
