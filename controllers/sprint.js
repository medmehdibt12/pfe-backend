import { Sprint } from "../models/sprint.js";
import { Project } from "../models/project.js";
import AppError from "../utils/AppError.js";

export const createSprint = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) throw new AppError("NOT_FOUND", "Projet introuvable", 404);

    // Only owner or admin can create sprint within project
    if (
      project.student.toString() !== req.auth.userId &&
      req.auth.role !== "admin"
    ) {
      throw new AppError(
        "FORBIDDEN",
        "Seul le propriétaire ou admin peut créer un sprint",
        403
      );
    }

    const sprint = await Sprint.create({ ...req.body, project: project._id });
    res.status(201).json(sprint);
  } catch (err) {
    next(err);
  }
};

export const listSprints = async (req, res, next) => {
  try {
    const sprints = await Sprint.find({ project: req.params.projectId }).sort(
      "startDate"
    );
    res.json(sprints);
  } catch (err) {
    next(err);
  }
};

export const updateSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("project");
    if (!sprint) throw new AppError("NOT_FOUND", "Sprint introuvable", 404);

    const ownerId = sprint.project.student.toString();
    if (ownerId !== req.auth.userId && req.auth.role !== "admin") {
      throw new AppError(
        "FORBIDDEN",
        "Seul le propriétaire ou admin peut modifier",
        403
      );
    }

    Object.assign(sprint, req.body);
    await sprint.save();
    res.json(sprint);
  } catch (err) {
    next(err);
  }
};

export const deleteSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("project");
    if (!sprint) throw new AppError("NOT_FOUND", "Sprint introuvable", 404);

    const ownerId = sprint.project.student.toString();
    if (ownerId !== req.auth.userId && req.auth.role !== "admin") {
      throw new AppError(
        "FORBIDDEN",
        "Seul le propriétaire ou admin peut supprimer",
        403
      );
    }

    await sprint.remove();
    res.json({ message: "Sprint supprimé" });
  } catch (err) {
    next(err);
  }
};
