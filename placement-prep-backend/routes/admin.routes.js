import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addQuestion } from "../controllers/admin.controller.js";
import { createFullStructure } from "../controllers/admin.structure.controller.js";

const router = express.Router();

router.post("/questions", protect, addQuestion);
router.post("/structure", protect, createFullStructure);

export default router;
