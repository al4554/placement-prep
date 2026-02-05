import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { getSubjects } from "../controllers/subject.controller.js";
import { getTopicsBySubject } from "../controllers/topic.controller.js";
import { getResourcesByTopic } from "../controllers/resource.controller.js";

const router = express.Router();

router.get("/subjects", protect, getSubjects);
router.get("/subjects/:subjectId/topics", protect, getTopicsBySubject);
router.get("/topics/:topicId/resources", protect, getResourcesByTopic);

export default router;
