import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchRoutes from "./routes/searchRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
