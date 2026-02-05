import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  postMessage,
  getArenaMessages,
  getReplies
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protect, getArenaMessages);
router.post("/", protect, postMessage);
router.get("/:id/replies", protect, getReplies);

export default router;
