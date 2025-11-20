import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";

export const loggedMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError("UNAUTHORIZED", "Token manquant", 401);
    }
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId);
    if (!user)
      throw new AppError("UNAUTHORIZED", "Utilisateur inexistant", 401);

    req.auth = { userId: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return next(new AppError("UNAUTHORIZED", "Token invalide", 401));
    if (err.name === "TokenExpiredError")
      return next(new AppError("UNAUTHORIZED", "Token expiré", 401));
    next(err);
  }
};

export const permit =
  (roles = []) =>
  (req, res, next) => {
    if (!req.auth)
      return next(new AppError("UNAUTHORIZED", "Accès non autorisé", 401));
    if (roles.length && !roles.includes(req.auth.role)) {
      return next(new AppError("FORBIDDEN", "Accès refusé", 403));
    }
    next();
  };
