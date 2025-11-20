export default class AppError extends Error {
  constructor(code, message, statusCode = 500, details = []) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
