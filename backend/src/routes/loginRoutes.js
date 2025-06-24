import express from "express";
import LoginController from "../controllers/LoginController.js";

const router = express.Router();
// POST /api/login
router.post("/", LoginController.fazerLogin);

export default router;
