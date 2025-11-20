import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { Project } from "../models/project.js";
import { Sprint } from "../models/sprint.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // supprimer anciens
  await User.deleteMany({});
  await Project.deleteMany({});
  await Sprint.deleteMany({});

  const pass = await bcrypt.hash("password123", 10);
  const students = [];
  for (let i = 1; i <= 3; i++) {
    const u = await User.create({
      name: `Student${i}`,
      email: `student${i}@test.com`,
      password: pass,
      role: "student",
    });
    students.push(u);
  }
  const sup = await User.create({
    name: "Supervisor",
    email: "supervisor@test.com",
    password: pass,
    role: "supervisor",
  });
  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: pass,
    role: "admin",
  });

  // projects: each student one project
  const projects = [];
  for (let i = 0; i < students.length; i++) {
    const p = await Project.create({
      title: `PFE ${i + 1}`,
      description: `Projet de test ${i + 1}`,
      student: students[i]._id,
    });
    projects.push(p);
  }

  // sprints: 2 sprints per project
  for (const p of projects) {
    await Sprint.create({
      project: p._id,
      name: "Sprint 1",
      goal: "Analyse",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    });
    await Sprint.create({
      project: p._id,
      name: "Sprint 2",
      goal: "Implémentation",
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    });
  }

  console.log("Seed done. Users:");
  console.log(
    "student1@test.com, student2@test.com, student3@test.com, supervisor@test.com, admin@test.com (password: password123)"
  );
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
