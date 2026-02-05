import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getUserStreak } from "../controllers/streak.controller.js";

const router = express.Router();

router.get("/", protect, getUserStreak);

export default router;
