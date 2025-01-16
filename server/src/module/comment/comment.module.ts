import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

const commentService = new CommentService();
const commentController = new CommentController(commentService);

export { commentController, commentService };
