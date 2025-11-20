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
/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Gestion des projets
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Créer un projet
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Projet créé
 *
 *   get:
 *     summary: Lister mes projets
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des projets
 *
 * /api/projects/{id}:
 *   get:
 *     summary: Obtenir un projet par ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: 'Projet trouvé' } }
 *
 *   put:
 *     summary: Modifier un projet
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Project' }
 *     responses: { 200: { description: 'Projet mis à jour' } }
 *
 *   delete:
 *     summary: Supprimer un projet
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: 'Projet supprimé' } }
 */

export default router;
