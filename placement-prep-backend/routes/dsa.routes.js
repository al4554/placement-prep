import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
//  upsertTodayProgress,
  getUserProgress
} from "../controllers/dsa.controller.js";

const router = express.Router();

//router.post("/today", protect, upsertTodayProgress);
router.get("/", protect, getUserProgress);

export default router;
