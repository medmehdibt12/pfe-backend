import express from "express";
import {
  createSprint,
  listSprints,
  updateSprint,
  deleteSprint,
} from "../controllers/sprint.js";
import { loggedMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:projectId", loggedMiddleware, createSprint);
router.get("/:projectId", loggedMiddleware, listSprints);
router.put("/id/:id", loggedMiddleware, updateSprint); // use /id/:id to avoid route conflict
router.delete("/id/:id", loggedMiddleware, deleteSprint);

export default router;
