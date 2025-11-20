import express from "express";
import { getDashboard } from "../controllers/dashboard.js";
import { loggedMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", loggedMiddleware, getDashboard);
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Statistiques globales
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Obtenir les stats du dashboard
 *     tags: [Dashboard]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Dashboard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 */

export default router;
