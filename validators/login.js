import Joi from "joi";
import AppError from "../utils/AppError.js";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export function validateLogin(data) {
  const { error } = loginSchema.validate(data, { abortEarly: false });
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
