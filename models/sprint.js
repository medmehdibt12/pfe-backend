import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
    goal: String,
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export const Sprint = mongoose.model("Sprint", sprintSchema);
