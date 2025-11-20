import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userStorySchema = new Schema(
  {
    sprint: { type: Schema.Types.ObjectId, ref: "Sprint", required: true },
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const UserStory = model("UserStory", userStorySchema);
