import { Router } from "express";
import authRouter from "./auth.routes";
import snippetRouter from "./snippet.routes";
import routerComment from "./comment.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/snippet", snippetRouter);
router.use("/comment", routerComment);

export default router;
