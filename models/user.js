import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["student", "supervisor", "company", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
