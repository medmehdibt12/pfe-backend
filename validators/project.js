import Joi from "joi";
import AppError from "../utils/AppError.js";

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
});

export function validateProject(data) {
  const { error } = schema.validate(data, { abortEarly: false });
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
