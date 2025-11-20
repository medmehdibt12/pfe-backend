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

export default router;
