import express from "express";
import { getDashboard } from "../controllers/dashboard.js";
import { loggedMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", loggedMiddleware, getDashboard);

export default router;
