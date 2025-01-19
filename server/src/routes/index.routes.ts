import { Router } from "express";
import authRouter from "./auth.routes";
import snippetRouter from "./snippet.routes";
import routerComment from "./comment.routes";
import routerGemini from "./gemini.routes";
import { appConfig } from "../config/appConfig";

const router = Router();

router.use("/auth", authRouter);
router.use("/snippet", snippetRouter);
router.use("/comment", routerComment);
router.use("/geminiChat", routerGemini);
router.get("/test", (req, res) => {
  res.status(200).json({
    jwt: appConfig.JWT,
  });
});

export default router;
