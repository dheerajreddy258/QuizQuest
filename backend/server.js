// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

const aiRoutes = require('./routes/aiRoutes');

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB Atlas

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies



// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));