import Joi from "joi";
import AppError from "../utils/AppError.js";

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("student", "supervisor", "company", "admin")
    .optional(),
});

export function validateSignup(data) {
  const { error } = signupSchema.validate(data, { abortEarly: false });
  if (error) {
    const details = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    throw new AppError(
      "VALIDATION_ERROR",
      "Erreur de validation",
      400,
      details
    );
  }
}
