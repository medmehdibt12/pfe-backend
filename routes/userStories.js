import express from "express";
import {
  createUserStory,
  listUserStories,
  updateUserStory,
  deleteUserStory,
} from "../controllers/userStory.js";

import { loggedMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:sprintId", loggedMiddleware, createUserStory);
router.get("/:sprintId", loggedMiddleware, listUserStories);
router.put("/id/:id", loggedMiddleware, updateUserStory);
router.delete("/id/:id", loggedMiddleware, deleteUserStory);
/**
 * @swagger
 * components:
 *   schemas:
 *     UserStory:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - sprintId
 *       properties:
 *         title:
 *           type: string
 *           example: "US001 - Ajouter login"
 *         description:
 *           type: string
 *           example: "En tant qu'utilisateur, je veux me connecter"
 *         sprintId:
 *           type: string
 *           example: "64f0a2d5b3c123456789abcd"
 *         status:
 *           type: string
 *           enum: ["todo", "in-progress", "done"]
 *           example: "todo"
 */

/**
 * @swagger
 * tags:
 *   name: UserStory
 *   description: Gestion des User Stories
 */

/**
 * @swagger
 * /api/userStories/{sprintId}:
 *   post:
 *     summary: Créer une User Story pour un sprint
 *     tags: [UserStory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sprintId
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserStory' }
 *     responses:
 *       201:
 *         description: User Story créée
 *
 *   get:
 *     summary: Lister les User Stories d’un sprint
 *     tags: [UserStory]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: sprintId
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Liste des User Stories
 *
 * /api/userStories/id/{id}:
 *   put:
 *     summary: Modifier une User Story
 *     tags: [UserStory]
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
 *           schema: { $ref: '#/components/schemas/UserStory' }
 *     responses:
 *       200:
 *         description: User Story modifiée
 *
 *   delete:
 *     summary: Supprimer une User Story
 *     tags: [UserStory]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: User Story supprimée
 */

export default router;
