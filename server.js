const express = require('express');
const cors = require('cors');
const popoutRoutes = require('./routes/popoutRoutes');
const admin = require('firebase-admin');
const canvasSyncRoutes = require('./routes/canvasSynncRoutes');
app.use('/canvas', canvasSyncRoutes);

//ini. firebase admin SDK
const serviceAccount = require('./firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/popout', popoutRoutes); //attach pop out window routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
