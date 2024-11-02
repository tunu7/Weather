// weather-backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const weatherRoutes = require("./routes/weather");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
