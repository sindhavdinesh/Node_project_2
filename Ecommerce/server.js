require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <--- 1. Sabse pehle yahan import karein
const app = express();
const path = require('path');
const connectDB = require('./config/dbConnection');

// Database Connect
connectDB();

// --- Middlewares ---

app.use(cors()); // <--- 2. Ise sabse upar rakhein taaki koi request block na ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---
const router = require('./routes/index.route'); 
app.use('/api', router);

// Default Route
app.get("/", (req, res) => {
    res.send("Server is running with CORS enabled!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});