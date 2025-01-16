import { ErrorCode } from "../enums/error-code.enums";
import { HTTPSTATUS, HttpStatusCode } from "./../config/http.config";
import { AppError } from "./AppError";

export class BadRequestException extends AppError {
  constructor(message: string) {
    super(message, HTTPSTATUS.BAD_REQUEST);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string) {
    super(message, HTTPSTATUS.NOT_FOUND);
  }
}

export class AuthorizedException extends AppError {
  constructor(message: string) {
    super(message, HTTPSTATUS.UNAUTHORIZED);
  }
}

export class InvalidRequestException extends AppError {
  constructor(message: string = "Invalid Request", errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST);
  }
}

export class HttpException extends AppError {
  constructor(message: string, code: HttpStatusCode, errorCode?: ErrorCode) {
    super(message, code, errorCode);
  }
}
