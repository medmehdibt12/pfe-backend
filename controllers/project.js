import { Project } from "../models/project.js";
import AppError from "../utils/AppError.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      student: req.auth.userId,
    });
    return res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const listMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ student: req.auth.userId }).sort(
      "-createdAt"
    );
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "student",
      "name email"
    );
    if (!project) throw new AppError("NOT_FOUND", "Projet introuvable", 404);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new AppError("NOT_FOUND", "Projet introuvable", 404);

    // ownership or admin
    if (
      project.student.toString() !== req.auth.userId &&
      req.auth.role !== "admin"
    ) {
      throw new AppError(
        "FORBIDDEN",
        "Seul le propriétaire ou admin peut modifier",
        403
      );
    }

    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new AppError("NOT_FOUND", "Projet introuvable", 404);

    if (
      project.student.toString() !== req.auth.userId &&
      req.auth.role !== "admin"
    ) {
      throw new AppError(
        "FORBIDDEN",
        "Seul le propriétaire ou admin peut supprimer",
        403
      );
    }

    await project.remove();
    res.json({ message: "Projet supprimé" });
  } catch (err) {
    next(err);
  }
};
