import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
//Enable all CORS for all routes
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/histories", historyRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

export default app;