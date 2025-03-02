const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes"); // Perplexity API routes
const searchRoutesLinkup = require("./routes/searchRoutesLinkup"); // LinkUp API routes
require("dotenv").config();

const app = express();

app.use(cors());

// Attach both Perplexity and LinkUp API routes
app.use("/api", searchRoutes);
app.use("/api", searchRoutesLinkup); // New route for LinkUp API

app.listen(5004, () => console.log("Server running on port 5004"));
