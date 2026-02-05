import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { generatePlan } from "../controllers/planner.controller.js";

const router = express.Router();

router.post("/generate", protect, generatePlan);

export default router;
