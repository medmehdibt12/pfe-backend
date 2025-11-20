import express from "express";
import { signup, login } from "../controllers/auth.js";
import { validateSignup } from "../validators/user.js";
import { validateLogin } from "../validators/login.js";

const router = express.Router();

router.post("/signup", (req, res, next) => {
  try {
    validateSignup(req.body);
    next();
  } catch (err) {
    next(err);
  }
});
router.post("/signup", signup);

router.post("/login", (req, res, next) => {
  try {
    validateLogin(req.body);
    next();
  } catch (err) {
    next(err);
  }
});
router.post("/login", login);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string }
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       409:
 *         description: Email déjà utilisé
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Email ou mot de passe incorrect
 */


export default router;
