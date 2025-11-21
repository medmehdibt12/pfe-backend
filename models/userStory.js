import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userStorySchema = new Schema(
  {
    sprint: { type: Schema.Types.ObjectId, ref: "Sprint", required: true },
    title: String,
    description: String,
    status: { type: String, default: "To Do" },
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserStory = model("UserStory", userStorySchema);
