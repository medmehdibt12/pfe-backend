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
/**
 * @swagger
 * tags:
 *   name: Sprint
 *   description: Gestion des sprints
 */

/**
 * @swagger
 * /api/sprints/{projectId}:
 *   post:
 *     summary: Créer un sprint pour un projet
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Sprint' }
 *     responses: { 201: { description: 'Sprint créé' } }
 *
 *   get:
 *     summary: Lister les sprints d’un projet
 *     tags: [Sprint]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema: { type: string }
 *         required: true
 *     responses: { 200: { description: 'Liste des sprints' } }
 *
 * /api/sprints/id/{id}:
 *   put:
 *     summary: Modifier un sprint
 *     tags: [Sprint]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Sprint' }
 *     responses: { 200: { description: 'Sprint modifié' } }
 *
 *   delete:
 *     summary: Supprimer un sprint
 *     tags: [Sprint]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses: { 200: { description: 'Sprint supprimé' } }
 */

export default router;
