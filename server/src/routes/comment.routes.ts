import { Router } from "express";
import { commentController } from "../module/comment/comment.module";
import authentication from "../middleware/authentication";

const routerComment = Router();

routerComment.post("/create", authentication, commentController.createComment);
routerComment.post("/paging", commentController.pagingComment);
export default routerComment;
