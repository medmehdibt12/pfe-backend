import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import dashboardRouter from "./routes/dashboard.js";

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
app.use("/api/dashboard", dashboardRouter);
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
