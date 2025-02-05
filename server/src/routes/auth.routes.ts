import { Router } from "express";
import { authController } from "../module/auth/auth.module";
import authentication from "../middleware/authentication";

const authRouter = Router();

authRouter.post("/login", authController.loginAuth);
authRouter.get("/current", authentication, authController.getCurrent);
authRouter.get("/refresh", authController.refreshToken);
authRouter.get("/logout", authController.logoutAuth);
authRouter.get("/request", authController.createRequest);

export default authRouter;
