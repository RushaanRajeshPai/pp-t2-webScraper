const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes"); 
require("dotenv").config();

const app = express();
app.use(cors());
app.use("/api", searchRoutes);

app.listen(5004, () => console.log("Server running on port 5004"));