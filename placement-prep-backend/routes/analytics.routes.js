import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getTopicAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/topics", protect, getTopicAnalytics);

export default router;
