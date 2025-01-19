import { CookieOptions } from "express";
import { appConfig } from "../config/appConfig";

export const defaultCookieRefresh: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 30,
  httpOnly: true,
  path: "/",
  secure: true,
  sameSite: "none",
};
