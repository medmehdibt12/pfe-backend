import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) throw new AppError("CONFLICT", "Email déjà utilisé", 409);

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      throw new AppError(
        "UNAUTHORIZED",
        "Email ou mot de passe incorrect",
        401
      );

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      throw new AppError(
        "UNAUTHORIZED",
        "Email ou mot de passe incorrect",
        401
      );

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token: "Bearer " + token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
