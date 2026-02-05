import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
console.log("AUTH ROUTES LOADED");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
