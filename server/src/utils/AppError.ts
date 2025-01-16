import { HTTPSTATUS, HttpStatusCode } from "../config/http.config";
import { ErrorCode } from "../enums/error-code.enums";

export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: ErrorCode;

  constructor(
    message: string,
    code: HttpStatusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode
  ) {
    super(message);
    this.statusCode = code;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
