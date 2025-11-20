import AppError from "../utils/AppError.js";

export default function errorHandler(err, req, res, next) {
  if (err.name === "AppError") {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  res.status(500).json({
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Une erreur interne est survenue",
    details: [],
  });
}
