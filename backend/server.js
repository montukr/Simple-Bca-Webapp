import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);

connectDB();
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
