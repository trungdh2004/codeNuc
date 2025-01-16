import { ErrorRequestHandler, Response } from "express";
import { AppError } from "../utils/AppError";
import { HTTPSTATUS } from "../config/http.config";
import { AxiosError } from "axios";

export const errorhandler: ErrorRequestHandler = (err, req, res, next): any => {
  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: `Invalid JSON payload passed.`,
      error: err.message,
    });
  }

  if (err instanceof AxiosError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      error: err.message,
      message: `Axios request failed`,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: `Internal Server Error`,
    error: err.message || "Unknown error occurred",
  });
};
