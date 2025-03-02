// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import searchRoutes from './routes/searchRoutes.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/api/search', searchRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/api", searchRoutes);

app.listen(5004, () => console.log("Server running on port 5004"));
