import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import {
  getAllQuestions,
  addQuestion,
  markSolved,
  unmarkSolved
} from "../controllers/question.controller.js";

const router = express.Router();

// Any logged-in user can view questions
router.get("/", protect, getAllQuestions);

// Admin only: add question
router.post("/", protect, adminOnly, addQuestion);

// User marks question solved
router.post("/solve", protect, markSolved);

router.delete("/solve/:questionId", protect, unmarkSolved);


export default router;
