
const express = require("express");
const { collection, addDoc } = require("firebase/firestore");
const { db } = require("../src/firebase/firebaseConfig");

const app = express();
//app.use(cors());
app.use(express.json());

app.post("/api/setNotes", async (req, res) => {
    console.log("request received:", req.body);

    const { userName, note } = req.body;
    cons [message, setMessage] = useState("");

    //const userRef = collection(db, "Notes");
    if (!userName || !note) {
        return res.status(400).json({ error: "Missing required fields" });
      }


    try {
        // Hash password
        await addDoc(collection(db, "Notes"),{
          userName,
          note,
          timeStamp: new Date().toISOString(),
        });
    
        res.status(200).json({ message: "Note added successfully!" });
      } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Failed to add note" });
      }
});

  
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;