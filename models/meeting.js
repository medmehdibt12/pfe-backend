import mongoose from "mongoose";
const { Schema, model } = mongoose;

const meetingSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    date: Date,
    agenda: String,
    content: String,
    validated: Boolean,
    userStory: { type: Schema.Types.ObjectId, ref: "UserStory" },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    reportVersion: { type: Schema.Types.ObjectId, ref: "Report" },
  },
  { timestamps: true }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
