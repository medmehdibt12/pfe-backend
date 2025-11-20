import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    version: Number,
    date: Date,
    notes: String,
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
