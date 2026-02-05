import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

import { createSubject } from "../controllers/subject.controller.js";
import { createTopic } from "../controllers/topic.controller.js";
import { createResource } from "../controllers/resource.controller.js";

const router = express.Router();

router.post("/subjects", protect, adminOnly, createSubject);
router.post("/topics", protect, adminOnly, createTopic);
router.post("/resources", protect, adminOnly, createResource);

export default router;
