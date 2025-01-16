import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { UserDocument } from "../models/User.model";
import { appConfig } from "../config/appConfig";

export type PayloadToken = {
  userId: UserDocument["_id"];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: appConfig.JWT.ACCESS_EXPIRES_IN,
  secret: appConfig.JWT.ACCESS_SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: appConfig.JWT.EXPIRES_IN,
  secret: appConfig.JWT.SECRET,
};

export const signJwtToken = (
  payload: PayloadToken,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...opts,
  });
};

export const verifyToken = async (
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = appConfig.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...opts,
    }) as PayloadToken;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
