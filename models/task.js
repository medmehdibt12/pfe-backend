import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    userStory: {
      type: Schema.Types.ObjectId,
      ref: "UserStory",
      required: true,
    },
    title: String,
    status: {
      type: String,
      enum: ["ToDo", "InProgress", "Standby", "Done"],
      default: "ToDo",
    },
    history: [{ status: String, date: Date }],
    validations: [
      {
        status: String, // validé/invalide
        author: { type: Schema.Types.ObjectId, ref: "User" },
        date: Date,
        meeting: { type: Schema.Types.ObjectId, ref: "Meeting" },
      },
    ],
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
