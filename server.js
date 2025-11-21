import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

// Import des routes
import authRouter from "./routes/auth.js";
import projectRouter from "./routes/project.js";
import sprintRouter from "./routes/sprint.js";
import dashboardRouter from "./routes/dashboard.js";
import userStoryRoutes from "./routes/userStories.js";

// Swagger
import { setupSwagger } from "./swagger.js";

const app = express();
app.use(express.json());

// Connexion MongoDB
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes API
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/sprints", sprintRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/userStories", userStoryRoutes);

// Swagger
setupSwagger(app);

// Middleware global d’erreur (à ajouter si tu as AppError)
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  res.status(err.statusCode || err.status || 500).json({
    message: err.message,
    code: err.code || "SERVER_ERROR",
    statusCode: err.statusCode,
    details: err.details || null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Démarrage serveur
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
