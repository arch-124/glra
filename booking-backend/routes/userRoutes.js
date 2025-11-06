
import express from "express";
import { register, login } from "../controllers/userController.js";
console.log("✅ userRoutes.js loaded");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
