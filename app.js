import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.js";
import sprintRoutes from "./routes/sprint.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import userStoryRoutes from "./routes/userStories.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/sprints", sprintRoutes);
app.use("/userStories", userStoryRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
