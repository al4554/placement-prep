import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import dsaRoutes from "./routes/dsa.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import questionRoutes from "./routes/question.routes.js";
import streakRoutes from "./routes/streak.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import plannerRoutes from "./routes/planner.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import adminContentRoutes from "./routes/admin.content.routes.js";
import contentRoutes from "./routes/content.routes.js";

const app = express();
connectDB();
//always follow this order for middlewares yhn se line 25 tk
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.path);
  console.log("BODY:", req.body);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin/content", adminContentRoutes);
app.use("/api/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

 