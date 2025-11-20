import express from "express";
import {
  createProject,
  listMyProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";
import { loggedMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", loggedMiddleware, createProject);
router.get("/", loggedMiddleware, listMyProjects);
router.get("/:id", loggedMiddleware, getProject);
router.put("/:id", loggedMiddleware, updateProject);
router.delete("/:id", loggedMiddleware, deleteProject);

export default router;
