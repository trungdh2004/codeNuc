import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { HTTPSTATUS } from "../config/http.config";
import { appConfig } from "../config/appConfig";
import { AuthorizedException, BadRequestException } from "../utils/catchError";
import { authService } from "../module/auth/auth.module";
import { RequestUser } from "../interface/system";
import { asyncHandler } from "./asyncHandler";

const authentication = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AuthorizedException("Chưa truyền token");
    }

    const { error, payload } = await verifyToken(token, {
      secret: appConfig.JWT.ACCESS_SECRET,
    });

    if (error || !payload) {
      throw new AuthorizedException(error);
    }

    const user = await authService.findById(payload.userId as string);

    req.user = {
      id: user._id as string,
      email: user.email,
      uuid: user.uuid,
      name: user.name,
    };

    next();
  }
);

export default authentication;
